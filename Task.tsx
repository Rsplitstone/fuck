import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Tag, Edit, Trash2, CheckCircle } from "lucide-react";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { Task, TaskStatus, TaskPriority, Case, TaskCategory } from "@shared/schema";
import { cn } from "@/lib/utils";

interface TaskProps {
  task: Task;
  category?: TaskCategory;
  caseData?: Case;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onStatusChange?: (taskId: number, newStatus: TaskStatus) => void;
  showActions?: boolean;
}

const TaskComponent: React.FC<TaskProps> = ({
  task,
  category,
  caseData,
  onEdit,
  onDelete,
  onStatusChange,
  showActions = true,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500 text-white';
      case 'In Progress': return 'bg-blue-500 text-white';
      case 'Pending': return 'bg-yellow-500';
      case 'Not Started': return 'bg-gray-500 text-white';
      case 'On Hold': return 'bg-purple-500 text-white';
      case 'Cancelled': return 'bg-red-300 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    
    try {
      const date = new Date(dateString);
      
      if (isToday(date)) {
        return 'Today';
      } else if (isTomorrow(date)) {
        return 'Tomorrow';
      } else {
        return format(date, 'MMM d, yyyy');
      }
    } catch (error) {
      return 'Invalid date';
    }
  };

  const isDueDatePast = (dateString: string | null) => {
    if (!dateString) return false;
    
    try {
      const date = new Date(dateString);
      return isPast(date) && !isToday(date);
    } catch (error) {
      return false;
    }
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {category && (
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color || undefined }} 
              />
            )}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <div className="flex space-x-1">
            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {task.description && (
          <p className="text-sm text-gray-700 mb-3">{task.description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          {caseData && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Case:</span>
              {caseData.name}
            </div>
          )}
          
          {category && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Category:</span>
              <span style={{ color: category.color || undefined }}>{category.name}</span>
            </div>
          )}
          
          {task.assignedTo && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Assigned:</span>
              {task.assignedTo}
            </div>
          )}
          
          {task.dueDate && (
            <div className={cn("flex items-center", isDueDatePast(task.dueDate) ? "text-red-600" : "text-gray-600")}>
              <span className="font-medium mr-2">Due:</span>
              <CalendarIcon className="h-3 w-3 mr-1" />
              {formatDueDate(task.dueDate)}
            </div>
          )}
          
          {task.estimatedHours && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Est. Hours:</span>
              <Clock className="h-3 w-3 mr-1" />
              {task.estimatedHours}
            </div>
          )}
        </div>
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex items-center mt-3 space-x-1 text-sm">
            <Tag className="h-3 w-3" />
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-2 flex justify-between">
          <div>
            {task.status !== 'Completed' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-600"
                onClick={() => handleStatusChange('Completed')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskComponent; 