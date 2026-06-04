import React from 'react';
import { DocumentCard } from './DocumentCard';

export interface CaseDocument {
  id: string;
  name: string;
  content: string;
}

interface DocumentInputProps {
  documents: CaseDocument[];
  onAddDocument: () => void;
  onUpdateDocument: (id: string, updates: Partial<CaseDocument>) => void;
  onRemoveDocument: (id: string) => void;
  onExtract: () => void;
  isExtracting: boolean;
}

export const DocumentInput: React.FC<DocumentInputProps> = ({
  documents,
  onAddDocument,
  onUpdateDocument,
  onRemoveDocument,
  onExtract,
  isExtracting,
}) => {
  return (
    <div className="w-[380px] shrink-0 bg-[#0e1423] border-r border-border-color flex flex-col p-6 gap-6 overflow-hidden">
      <div className="flex items-center justify-between font-display text-[1.05rem] font-bold text-text-primary border-b border-border-color pb-4">
        <span>Case Evidence & Notes</span>
        <span className="text-[0.65rem] font-semibold uppercase bg-brand-primary/15 text-brand-primary px-2 py-0.5 rounded-full border border-brand-primary/30">
          {documents.length} docs
        </span>
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onUpdate={onUpdateDocument}
            onRemove={onRemoveDocument}
          />
        ))}

        <div 
          className="border border-dashed border-border-color rounded-lg p-3.5 text-center text-[0.8125rem] text-text-secondary cursor-pointer transition-all duration-200 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/[0.04]" 
          onClick={onAddDocument}
        >
          + Add New Document / Notes
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border-color">
        <button
          className="inline-flex items-center justify-center gap-2 font-sans text-[0.875rem] font-semibold rounded-lg border-none cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-brand-accent text-[#0b0f19] hover:bg-[#0d9488] active:scale-[0.98] w-full py-3 px-4 shadow-md shadow-brand-accent/10"
          onClick={onExtract}
          disabled={isExtracting || documents.length === 0 || documents.every(d => !d.content.trim())}
        >
          {isExtracting ? (
            <>
              <svg className="animate-spin rounded-full border-2 border-white/10 border-t-white h-4 w-4 mr-2" />
              Extracting Timeline...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Extract & Build Timeline
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default DocumentInput;
