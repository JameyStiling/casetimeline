import React from 'react';
import { Badge } from './ui/Badge';
import type { TimelineEvent } from './TimelineView';

interface TimelineTableProps {
  events: TimelineEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: TimelineEvent) => void;
  onEditEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const TimelineTable: React.FC<TimelineTableProps> = ({
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

  const thClass = "bg-[#0e1423] text-text-primary font-display font-semibold p-4 border-b border-border-color sticky top-0 z-[1] select-none text-left";
  const tdClass = "p-4 border-b border-border-color/40 text-text-secondary vertical-middle";
  const iconBtnClass = "bg-transparent border-none text-text-muted hover:bg-border-color hover:text-text-primary cursor-pointer flex items-center justify-center p-1.5 rounded-md transition-all duration-150";

  return (
    <div className="flex-1 overflow-y-auto p-6 w-full">
      <table className="w-full border-collapse text-left text-[0.875rem]">
        <thead>
          <tr>
            <th className={`${thClass} w-[15%]`}>Normalized Date</th>
            <th className={`${thClass} w-[15%]`}>Written Date</th>
            <th className={`${thClass} w-[40%]`}>Event Details</th>
            <th className={`${thClass} w-[10%]`}>Category</th>
            <th className={`${thClass} w-[15%]`}>Source Citation</th>
            <th className={`${thClass} w-[5%]`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const isSelected = selectedEventId === event.id;
            return (
              <tr 
                key={event.id}
                className={`cursor-pointer hover:bg-border-color/20 transition-colors duration-100 ${isSelected ? 'bg-brand-primary/[0.08]' : ''}`}
                onClick={() => onSelectEvent(event)}
              >
                <td className={`${tdClass} font-medium text-text-primary`}>{event.normalizedDate}</td>
                <td className={`${tdClass} text-[0.8rem]`}>{event.dateStr}</td>
                <td className={tdClass}>
                  <div className="font-semibold text-text-primary mb-1">{event.title}</div>
                  <div className="text-[0.85rem] text-text-secondary">{event.description}</div>
                </td>
                <td className={tdClass}>
                  <Badge variant={event.category}>
                    {event.category}
                  </Badge>
                </td>
                <td className={tdClass}>
                  <div 
                    className="inline-flex items-center gap-1.5 text-[0.75rem] text-brand-secondary bg-brand-secondary/5 px-2.5 py-1 rounded-md border border-dashed border-brand-secondary/20 transition-all duration-150 hover:bg-brand-secondary/10 hover:border-brand-secondary/40" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event);
                    }}
                  >
                    {event.citation.sourceDoc}
                  </div>
                </td>
                <td className={tdClass}>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className={iconBtnClass} 
                      onClick={() => onEditEvent(event)}
                      title="Edit Event"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      className="bg-transparent border-none text-red-500/70 hover:bg-red-500/10 hover:text-red-500 cursor-pointer flex items-center justify-center p-1.5 rounded-md transition-all duration-150" 
                      onClick={() => onDeleteEvent(event.id)}
                      title="Delete Event"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TimelineTable;
