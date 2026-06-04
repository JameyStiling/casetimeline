import React from 'react';
import { CategoryFilters } from './CategoryFilters';
import { VerticalTimeline } from './VerticalTimeline';
import { TimelineTable } from './TimelineTable';

export interface Citation {
  sourceDoc: string;
  quote: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface TimelineEvent {
  id: string;
  dateStr: string;
  normalizedDate: string;
  title: string;
  description: string;
  category: 'communication' | 'fact' | 'transaction' | 'incident' | 'legal' | 'other';
  citation: Citation;
}

interface TimelineViewProps {
  events: TimelineEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: TimelineEvent) => void;
  onEditEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
  onAddEventClick: () => void;
  viewMode: 'timeline' | 'table';
  setViewMode: (mode: 'timeline' | 'table') => void;
  searchText: string;
  setSearchText: (text: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent,
  onAddEventClick,
  viewMode,
  setViewMode,
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
}) => {
  // Filter events dynamically
  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchText.toLowerCase()) ||
      e.description.toLowerCase().includes(searchText.toLowerCase()) ||
      e.citation.sourceDoc.toLowerCase().includes(searchText.toLowerCase()) ||
      e.citation.quote.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const tabOptionClass = "px-3.5 py-1.5 text-[0.8125rem] font-semibold text-text-secondary rounded-md cursor-pointer transition-all duration-150 select-none hover:text-text-primary";

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-8 bg-[#0e1423] border-b border-border-color shrink-0 flex-wrap">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-[200px] sm:min-w-[280px]">
          <div className="relative flex-1 flex items-center">
            <svg className="absolute left-3.5 text-text-muted w-[1.125rem] h-[1.125rem] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="bg-main border border-border-color rounded-lg text-text-primary pl-10 pr-4 py-2.5 font-sans text-[0.875rem] transition-all duration-150 w-full placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              placeholder="Search timeline..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Toggle */}
          <div className="flex border border-border-color rounded-lg p-0.5 bg-main overflow-hidden">
            <div 
              className={`${tabOptionClass} ${viewMode === 'timeline' ? 'bg-border-color text-text-primary shadow-sm' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              Timeline
            </div>
            <div 
              className={`${tabOptionClass} ${viewMode === 'table' ? 'bg-border-color text-text-primary shadow-sm' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <span className="hidden sm:inline">Table Grid</span>
              <span className="inline sm:hidden">Grid</span>
            </div>
          </div>

          <button 
            className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border-none cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-brand-primary text-white hover:bg-brand-primary-hover py-2.5 px-3 sm:px-4 active:scale-[0.98] shadow-md shadow-brand-primary/10" 
            onClick={onAddEventClick}
          >
            + <span className="hidden sm:inline">Add Event</span>
          </button>
        </div>
      </div>

      {/* Category filters badges */}
      <CategoryFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Timeline Scroll Workspace */}
      {viewMode === 'timeline' ? (
        <VerticalTimeline
          events={filteredEvents}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
        />
      ) : (
        <TimelineTable
          events={filteredEvents}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </div>
  );
};
export default TimelineView;
