import { useState } from 'react';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { CalendarFilters } from '@/components/calendar/CalendarFilters';
import { EventDetailsDialog } from '@/components/calendar/EventDetailsDialog';
import { EventLegend } from '@/components/calendar/EventLegend';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import type { CalendarViewType } from '@/types/calendar';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarViewType>('month');
  const { events, filters, setFilters } = useCalendarEvents();
  
  return (
    <div className="space-y-6">
      <CalendarHeader 
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
      
      <CalendarFilters
        view={view}
        onViewChange={setView}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <CalendarGrid
        date={currentDate}
        view={view}
        events={events}
      />

      <EventLegend />
      <EventDetailsDialog />
    </div>
  );
}