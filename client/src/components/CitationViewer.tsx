import React from 'react';
import { Badge } from './ui/Badge';
import type { TimelineEvent } from './TimelineView';

interface CitationViewerProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

export const CitationViewer: React.FC<CitationViewerProps> = ({ event, onClose }) => {
  const isOpen = !!event;
  const confidence = event?.citation?.confidence || 'medium';

  return (
    <div className={`absolute right-0 top-0 bottom-0 w-full sm:w-[400px] bg-[#0e1423] border-l border-border-color shadow-2xl flex flex-col z-[5] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-5 border-b border-border-color">
        <h3 className="font-display text-[1.1rem] font-semibold text-text-primary">Source Citation Detail</h3>
        <button 
          className="bg-transparent border-none text-text-muted hover:bg-border-color hover:text-text-primary cursor-pointer flex items-center justify-center p-1.5 rounded-md transition-all duration-150" 
          onClick={onClose} 
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {event && (
        <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-1">
          {/* Linked Event Details */}
          <div className="flex flex-col gap-2">
            <Badge variant={event.category}>
              {event.category}
            </Badge>
            <h4 className="font-display text-[1.2rem] font-bold text-text-primary leading-snug">
              {event.title}
            </h4>
            <p className="text-[0.8125rem] text-text-muted">
              Fact Date: {event.dateStr}
            </p>
          </div>

          <hr className="border-t border-border-color my-1" />

          {/* Citation Info */}
          <div>
            <h5 className="text-[0.78rem] font-semibold text-text-secondary uppercase tracking-wider mb-2 block">Source Document</h5>
            <div className="bg-card border border-border-color rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-secondary">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span className="text-[0.875rem] font-semibold text-text-primary">{event.citation.sourceDoc}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h5 className="text-[0.78rem] font-semibold text-text-secondary uppercase tracking-wider">Extraction Confidence</h5>
              <Badge variant={confidence}>
                {confidence}
              </Badge>
            </div>
          </div>

          {/* Quote Block */}
          <div className="flex flex-col gap-1.5">
            <h5 className="text-[0.78rem] font-semibold text-text-secondary uppercase tracking-wider block">Evidence Quote / Context Snippet</h5>
            <div className="text-[0.9rem] text-text-primary leading-relaxed italic bg-brand-secondary/[0.03] p-4 rounded-md border border-brand-secondary/10 border-l-[3px] border-l-brand-secondary">
              "{event.citation.quote}"
            </div>
          </div>

          {/* Event description */}
          <div className="flex flex-col gap-1.5">
            <h5 className="text-[0.78rem] font-semibold text-text-secondary uppercase tracking-wider block">Timeline Explanation</h5>
            <p className="text-[0.9rem] text-text-secondary leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CitationViewer;
