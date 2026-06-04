import React from 'react';
import type { CaseDocument } from './DocumentInput';

interface DocumentCardProps {
  doc: CaseDocument;
  onUpdate: (id: string, updates: Partial<CaseDocument>) => void;
  onRemove: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="bg-card border border-border-color rounded-lg p-4 flex flex-col gap-3 transition-all duration-150 hover:border-border-hover">
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          className="text-[0.875rem] font-semibold text-text-primary border-none bg-transparent border-b border-dashed border-transparent pb-0.5 focus:outline-none focus:border-brand-primary w-full"
          value={doc.name}
          onChange={(e) => onUpdate(doc.id, { name: e.target.value })}
        />
        <button
          className="bg-transparent border-none text-text-muted cursor-pointer p-1 rounded transition-all duration-150 hover:bg-red-500/15 hover:text-red-500 flex items-center justify-center"
          onClick={() => onRemove(doc.id)}
          title="Remove Document"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
      <textarea
        className="bg-main border border-border-color rounded-md text-text-secondary p-3 font-sans text-[0.8125rem] min-h-[120px] resize-y leading-relaxed transition-all duration-150 focus:outline-none focus:border-brand-primary focus:text-text-primary"
        placeholder="Paste deposition notes, emails, logs, or trial records here..."
        value={doc.content}
        onChange={(e) => onUpdate(doc.id, { content: e.target.value })}
      />
    </div>
  );
};
export default DocumentCard;
