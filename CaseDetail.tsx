import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, AlertCircle, Clock, CalendarDays } from 'lucide-react';
import { Case } from '@shared/schema';

interface CaseDetailProps {
  caseData: Case;
  onEdit?: (caseData: Case) => void;
  taskCount?: number;
  upcomingEvents?: number;
}

const CaseDetail: React.FC<CaseDetailProps> = ({
  caseData,
  onEdit,
  taskCount = 0,
  upcomingEvents = 0,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Closed': return 'bg-gray-500 text-white';
      case 'Pending': return 'bg-yellow-500';
      case 'Archived': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{caseData.name}</CardTitle>
            {caseData.caseNumber && (
              <CardDescription>Case #{caseData.caseNumber}</CardDescription>
            )}
          </div>
          <Badge className={getStatusColor(caseData.status)}>{caseData.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 py-2">
          {caseData.clientName && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Client</h4>
              <p className="mt-1">{caseData.clientName}</p>
            </div>
          )}
          {caseData.court && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Court</h4>
              <p className="mt-1">{caseData.court}</p>
            </div>
          )}
          {caseData.filingDate && (
            <div className="flex items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Filing Date</h4>
                <p className="mt-1 flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1 text-gray-400" />
                  {caseData.filingDate ? format(new Date(caseData.filingDate), 'MMM d, yyyy') : 'N/A'}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Tasks</h4>
              <p className="mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                {taskCount} tasks
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Events</h4>
              <p className="mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1 text-gray-400" />
                {upcomingEvents} upcoming
              </p>
            </div>
          </div>
        </div>
        
        {caseData.notes && (
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-500">Notes</h4>
            <p className="mt-1 text-sm text-gray-700">{caseData.notes}</p>
          </div>
        )}
      </CardContent>
      
      {onEdit && (
        <CardFooter className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={() => onEdit(caseData)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit Case
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CaseDetail; 