import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Clock, 
  FileText, 
  Calendar as CalendarIcon,
  Users,
  Building
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Case } from "@shared/schema";

interface CaseListProps {
  cases: Case[];
  onCaseClick: (case_: Case) => void;
  onEditCase: (case_: Case) => void;
  onDeleteCase: (case_: Case) => void;
}

export const CaseList: React.FC<CaseListProps> = ({ 
  cases, 
  onCaseClick, 
  onEditCase, 
  onDeleteCase 
}) => {
  if (cases.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-gray-500">No cases found</h3>
        <p className="text-sm text-gray-400 mt-2">Create a new case to get started</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Closed': return 'bg-gray-500 text-white';
      case 'Pending': return 'bg-yellow-500';
      case 'Archived': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map((case_) => (
        <Card key={case_.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle 
                  className="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => onCaseClick(case_)}
                >
                  {case_.name}
                </CardTitle>
                {case_.caseNumber && (
                  <CardDescription>
                    <div className="flex items-center text-sm mt-1">
                      <FileText className="h-3 w-3 mr-1" />
                      Case #{case_.caseNumber}
                    </div>
                  </CardDescription>
                )}
              </div>
              <div className="flex items-center">
                <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onCaseClick(case_)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditCase(case_)}>
                      Edit Case
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600" 
                      onClick={() => onDeleteCase(case_)}
                    >
                      Delete Case
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col space-y-2">
              {case_.clientName && (
                <div className="flex items-center text-sm">
                  <Users className="h-3 w-3 mr-1 text-gray-500" />
                  <span>{case_.clientName}</span>
                </div>
              )}
              {case_.court && (
                <div className="flex items-center text-sm">
                  <Building className="h-3 w-3 mr-1 text-gray-500" />
                  <span>{case_.court}</span>
                </div>
              )}
              {case_.filingDate && (
                <div className="flex items-center text-sm">
                  <CalendarIcon className="h-3 w-3 mr-1 text-gray-500" />
                  <span>Filed: {formatDate(case_.filingDate)}</span>
                </div>
              )}
            </div>
            {case_.notes && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 line-clamp-2">{case_.notes}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2 text-xs text-gray-500">
            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => onCaseClick(case_)}>
              View All Tasks
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}; 