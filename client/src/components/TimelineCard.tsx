import React from 'react';
import { Badge } from './ui/Badge';
import type { TimelineEvent } from './TimelineView';

interface TimelineCardProps {
  event: TimelineEvent;
  isSelected: boolean;
  onSelect: (event: TimelineEvent) => void;
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  event,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const categoryBorderColors = {
    communication: 'border-cat-communication',
    fact: 'border-cat-fact',
    transaction: 'border-cat-transaction',
    incident: 'border-cat-incident',
    legal: 'border-cat-legal',
    other: 'border-cat-other'
  };

  return (
    <div className="relative w-full" id={`event-node-${event.id}`}>
      <div 
        className={`absolute left-[-1.5rem] sm:left-[-2rem] top-6 translate-x-[-50%] w-3 h-3 rounded-full bg-main border-[2.5px] z-[2] transition-all duration-150 ${categoryBorderColors[event.category]}`}
      />
      <div 
        className={`bg-card border rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col gap-3 hover:border-border-hover hover:shadow-lg hover:-translate-y-0.5 ${isSelected ? 'border-brand-primary shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'border-border-color'}`}
        onClick={() => onSelect(event)}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-text-secondary text-[0.8125rem] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{event.dateStr}</span>
          </div>
          <Badge variant={event.category}>
            {event.category}
          </Badge>
        </div>

        <h3 className="font-display text-[1.05rem] font-bold text-text-primary leading-snug">{event.title}</h3>
        <p className="text-[0.875rem] text-text-secondary leading-relaxed">{event.description}</p>

        <div className="flex items-center justify-between gap-2 mt-1 border-t border-border-color/30 pt-3">
          <div 
            className="inline-flex items-center gap-1.5 text-[0.75rem] text-brand-secondary bg-brand-secondary/5 px-2.5 py-1 rounded-md border border-dashed border-brand-secondary/20 transition-all duration-150 hover:bg-brand-secondary/10 hover:border-brand-secondary/40" 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(event);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5 shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span className="max-w-[145px] sm:max-w-none truncate">Cite: {event.citation.sourceDoc}</span>
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button 
              className="bg-transparent border-none text-text-muted hover:bg-border-color hover:text-text-primary cursor-pointer flex items-center justify-center p-1.5 rounded-md transition-all duration-150" 
              onClick={() => onEdit(event)}
              title="Edit Event"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button 
              className="bg-transparent border-none text-red-500/70 hover:bg-red-500/10 hover:text-red-500 cursor-pointer flex items-center justify-center p-1.5 rounded-md transition-all duration-150"
              onClick={() => onDelete(event.id)}
              title="Delete Event"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimelineCard;
