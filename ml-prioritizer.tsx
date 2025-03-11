import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles, AlertCircle, Clock, Calendar as CalendarIcon, BarChart4 } from "lucide-react";
import { Task, Case, TaskCategory } from "@shared/schema";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface MLPrioritizerProps {
  tasks: Task[];
  cases: Case[];
  categories: TaskCategory[];
  onTasksReordered: (tasks: Task[]) => void;
}

export const MLPrioritizer: React.FC<MLPrioritizerProps> = ({ 
  tasks, 
  cases, 
  categories, 
  onTasksReordered 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prioritizationFactor, setPrioritizationFactor] = useState<string>("dueDate");
  const [weightDueDate, setWeightDueDate] = useState(3);
  const [weightCaseImportance, setWeightCaseImportance] = useState(2);
  const [weightTaskType, setWeightTaskType] = useState(1);
  const [considerTaskDependencies, setConsiderTaskDependencies] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [prioritizedTasks, setPrioritizedTasks] = useState<any[]>([]);
  const [explanations, setExplanations] = useState<Record<number, string>>({});
  const { toast } = useToast();

  // This would be replaced with actual ML algorithm in production
  // Currently a demonstration of how the prioritization could work
  const analyzeTasks = () => {
    setIsAnalyzing(true);
    
    // Simulating ML analysis with a timeout
    setTimeout(() => {
      try {
        // Sort by due date (closest first)
        const sortedByDueDate = [...tasks].sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        
        // Apply weights based on priority
        const weighted = sortedByDueDate.map(task => {
          // Get the case for this task
          const relatedCase = cases.find(c => c.id === task.caseId);
          const category = categories.find(c => c.id === task.categoryId);
          
          // Calculate priority score (simplified mock algorithm)
          let priorityScore = 0;
          
          // Due date factor
          if (task.dueDate) {
            const daysUntilDue = Math.max(0, Math.floor((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
            const dueDateScore = daysUntilDue < 1 ? 10 : daysUntilDue < 3 ? 8 : daysUntilDue < 7 ? 6 : daysUntilDue < 14 ? 4 : 2;
            priorityScore += dueDateScore * weightDueDate;
          }
          
          // Priority factor
          const priorityValue = task.priority === 'Critical' ? 10 : task.priority === 'High' ? 8 : task.priority === 'Medium' ? 5 : 2;
          priorityScore += priorityValue * weightCaseImportance;
          
          // Task type/category factor
          let categoryScore = 5; // Default
          if (category) {
            // In a real system, certain categories would have higher scores based on historical importance
            if (category.name === 'Deadlines' || category.name === 'Court Filings') {
              categoryScore = 9;
            } else if (category.name === 'Client Communication') {
              categoryScore = 8;
            } else if (category.name === 'Hearings') {
              categoryScore = 7;
            }
          }
          priorityScore += categoryScore * weightTaskType;
          
          // Create a human-readable explanation
          let explanation = "";
          explanation += task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()} (${weightDueDate}x weight). ` : "";
          explanation += `${task.priority} priority (${weightCaseImportance}x weight). `;
          explanation += category ? `${category.name} category (${weightTaskType}x weight). ` : "";
          
          if (considerTaskDependencies) {
            explanation += "Dependencies considered. ";
          }
          
          return {
            ...task,
            priorityScore,
            explanation
          };
        });
        
        // Sort by final priority score (highest first)
        const prioritized = weighted.sort((a, b) => b.priorityScore - a.priorityScore);
        
        // Create explanations map
        const explanationsMap = prioritized.reduce((acc, task) => {
          acc[task.id] = task.explanation;
          return acc;
        }, {});
        
        setPrioritizedTasks(prioritized);
        setExplanations(explanationsMap);
        onTasksReordered(prioritized);
        
        toast({
          title: "Task prioritization complete",
          description: `${tasks.length} tasks have been analyzed and prioritized.`,
        });
      } catch (error) {
        console.error("Error in ML prioritization:", error);
        toast({
          title: "Prioritization failed",
          description: "There was an error analyzing your tasks. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  const getPriorityColor = (score: number) => {
    if (score >= 70) return "bg-red-500 text-white";
    if (score >= 50) return "bg-orange-500 text-white";
    if (score >= 30) return "bg-yellow-500";
    return "bg-green-500 text-white";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" /> 
          ML Task Prioritization
        </CardTitle>
        <CardDescription>
          Automatically prioritize your legal tasks using machine learning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="results" disabled={prioritizedTasks.length === 0}>
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <div className="space-y-4">
              <div>
                <Label htmlFor="prioritization-factor">Primary Prioritization Factor</Label>
                <Select 
                  value={prioritizationFactor} 
                  onValueChange={setPrioritizationFactor}
                >
                  <SelectTrigger id="prioritization-factor">
                    <SelectValue placeholder="Select factor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date (Time Sensitive)</SelectItem>
                    <SelectItem value="caseImportance">Case Importance</SelectItem>
                    <SelectItem value="clientPriority">Client Priority</SelectItem>
                    <SelectItem value="workload">Workload Balance</SelectItem>
                    <SelectItem value="balanced">Balanced Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="due-date-weight">
                    <Clock className="h-4 w-4 inline mr-1" /> Due Date Weight
                  </Label>
                  <span className="text-sm font-medium">{weightDueDate}</span>
                </div>
                <Slider 
                  id="due-date-weight"
                  min={1} 
                  max={5} 
                  step={1} 
                  value={[weightDueDate]}
                  onValueChange={(vals) => setWeightDueDate(vals[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="case-importance-weight">
                    <AlertCircle className="h-4 w-4 inline mr-1" /> Case Priority Weight
                  </Label>
                  <span className="text-sm font-medium">{weightCaseImportance}</span>
                </div>
                <Slider 
                  id="case-importance-weight"
                  min={1} 
                  max={5} 
                  step={1} 
                  value={[weightCaseImportance]}
                  onValueChange={(vals) => setWeightCaseImportance(vals[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-type-weight">
                    <BarChart4 className="h-4 w-4 inline mr-1" /> Task Category Weight
                  </Label>
                  <span className="text-sm font-medium">{weightTaskType}</span>
                </div>
                <Slider 
                  id="task-type-weight"
                  min={1} 
                  max={5} 
                  step={1} 
                  value={[weightTaskType]}
                  onValueChange={(vals) => setWeightTaskType(vals[0])}
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="consider-dependencies"
                  checked={considerTaskDependencies}
                  onCheckedChange={setConsiderTaskDependencies}
                />
                <Label htmlFor="consider-dependencies">
                  Consider task dependencies
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-explanations"
                  checked={showExplanations}
                  onCheckedChange={setShowExplanations}
                />
                <Label htmlFor="show-explanations">
                  Show priority explanations
                </Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {prioritizedTasks.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Tasks are ordered by calculated importance. The ML model has assigned priority scores based on your settings.
                </p>
                <ul className="space-y-2">
                  {prioritizedTasks.map((task, index) => (
                    <li key={task.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{task.title}</div>
                          {showExplanations && (
                            <p className="text-xs text-gray-500 mt-1">
                              {explanations[task.id]}
                            </p>
                          )}
                        </div>
                        <Badge className={getPriorityColor(task.priorityScore)}>
                          Score: {task.priorityScore}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Run the analyzer to see prioritized tasks
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setPrioritizedTasks([])}>
          Reset
        </Button>
        <Button onClick={analyzeTasks} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>Analyzing Tasks...</>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze & Prioritize Tasks
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}; 