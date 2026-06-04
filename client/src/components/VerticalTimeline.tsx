import React from 'react';
import { TimelineCard } from './TimelineCard';
import type { TimelineEvent } from './TimelineView';

interface VerticalTimelineProps {
  events: TimelineEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: TimelineEvent) => void;
  onEditEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 text-text-secondary text-center gap-4 flex-1">
        <div className="text-[2.5rem] opacity-50">📁</div>
        <h2 className="font-display text-[1.25rem] font-semibold text-text-primary">No matching events found</h2>
        <p className="text-[0.875rem] text-text-muted max-w-[320px]">Try resetting filters or check the search query.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 relative flex justify-center w-full">
      <div className="relative flex flex-col gap-6 w-full max-w-[750px] pl-8 border-l-2 border-border-color">
        {events.map((event) => (
          <TimelineCard
            key={event.id}
            event={event}
            isSelected={selectedEventId === event.id}
            onSelect={onSelectEvent}
            onEdit={onEditEvent}
            onDelete={onDeleteEvent}
          />
        ))}
      </div>
    </div>
  );
};
export default VerticalTimeline;
