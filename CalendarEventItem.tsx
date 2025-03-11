import React from 'react';
import { format, isToday } from 'date-fns';
import { CalendarEvent, Case } from '@shared/schema';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  MapPin, 
  CalendarDays, 
  Bell,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CalendarEventItemProps {
  event: CalendarEvent;
  caseData?: Case;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: number) => void;
  compact?: boolean;
}

const CalendarEventItem: React.FC<CalendarEventItemProps> = ({
  event,
  caseData,
  onEdit,
  onDelete,
  compact = false
}) => {
  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'Hearing': return 'bg-purple-500 text-white';
      case 'Deposition': return 'bg-blue-500 text-white';
      case 'Meeting': return 'bg-green-500 text-white';
      case 'Deadline': return 'bg-red-500 text-white';
      case 'Trial': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'h:mm a');
    } catch (error) {
      return 'Invalid time';
    }
  };

  const startDate = new Date(event.startDate);

  return (
    <Card className={cn(
      "shadow-sm", 
      isToday(startDate) ? "border-blue-500 border-2" : "",
      compact ? "p-2" : ""
    )}>
      <CardContent className={compact ? "p-0" : "pb-2"}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={cn("font-medium", compact ? "text-sm" : "text-base")}>{event.title}</h3>
            {caseData && !compact && (
              <p className="text-sm text-gray-500">
                <FileText className="inline h-3 w-3 mr-1" />
                {caseData.name}
              </p>
            )}
          </div>
          <Badge className={getEventTypeColor(event.eventType)}>
            {event.eventType}
          </Badge>
        </div>

        <div className={cn("grid text-sm text-gray-600", compact ? "mt-1 gap-1" : "mt-3 gap-2")}>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
            <span>
              {formatDateTime(event.startDate)}
              {event.endDate && ` - ${formatTime(event.endDate)}`}
            </span>
          </div>

          {event.location && !compact && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              <span>{event.location}</span>
            </div>
          )}

          {event.reminderTime && !compact && (
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-1 text-gray-400" />
              <span>Reminder: {formatDateTime(event.reminderTime)}</span>
            </div>
          )}

          {event.description && !compact && (
            <p className="mt-2 text-sm text-gray-700">{event.description}</p>
          )}
        </div>
      </CardContent>

      {!compact && (onEdit || onDelete) && (
        <CardFooter className={cn("flex justify-end gap-2", compact ? "p-0 mt-2" : "pt-2")}>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="outline" size="sm" className="text-red-600" onClick={() => onDelete(event.id)}>
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default CalendarEventItem; 