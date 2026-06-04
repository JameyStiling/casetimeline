import React from 'react';
import type { TimelineEvent } from './TimelineView';

interface ExportControlsProps {
  events: TimelineEvent[];
}

export const ExportControls: React.FC<ExportControlsProps> = ({ events }) => {
  const handleDownloadCSV = () => {
    if (events.length === 0) return;

    // CSV headers
    const headers = ['Normalized Date', 'Written Date', 'Title', 'Description', 'Category', 'Source Document', 'Evidence Quote'];
    
    // Convert events to rows, escaping double quotes
    const rows = events.map(e => [
      e.normalizedDate,
      e.dateStr,
      e.title,
      e.description,
      e.category,
      e.citation.sourceDoc,
      e.citation.quote
    ].map(val => `"${(val || '').replace(/"/g, '""')}"`));

    // Combine headers and rows
    const csvContent = [headers.map(h => `"${h}"`).join(','), ...rows.map(r => r.join(','))].join('\n');
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `case_timeline_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    if (events.length === 0) return;

    const jsonString = JSON.stringify({ events }, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `case_timeline_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const btnClasses = "inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-border-color/50 border-border-color text-text-primary hover:bg-border-color hover:border-border-hover py-2 px-3.5 shadow-sm active:scale-[0.98]";

  return (
    <div className="flex gap-2">
      <button 
        className={btnClasses}
        onClick={handleDownloadCSV}
        disabled={events.length === 0}
        title="Download spreadsheet-compatible CSV file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Export CSV
      </button>

      <button 
        className={btnClasses}
        onClick={handleDownloadJSON}
        disabled={events.length === 0}
        title="Download JSON structure"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line>
          <line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </svg>
        Export JSON
      </button>

      <button 
        className={btnClasses}
        onClick={handlePrint}
        disabled={events.length === 0}
        title="Print timeline report"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print
      </button>
    </div>
  );
};
export default ExportControls;
