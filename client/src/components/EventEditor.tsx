import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { FormField, Input, TextArea, Select } from './ui/Form';
import type { TimelineEvent } from './TimelineView';

interface EventEditorProps {
  isOpen: boolean;
  event: TimelineEvent | null; // Null means creating a new event
  onClose: () => void;
  onSave: (event: TimelineEvent) => void;
}

export const EventEditor: React.FC<EventEditorProps> = ({
  isOpen,
  event,
  onClose,
  onSave,
}) => {
  const [dateStr, setDateStr] = useState(() => event?.dateStr ?? new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
  const [normalizedDate, setNormalizedDate] = useState(() => event?.normalizedDate ?? new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState(() => event?.title ?? '');
  const [description, setDescription] = useState(() => event?.description ?? '');
  const [category, setCategory] = useState<TimelineEvent['category']>(() => event?.category ?? 'fact');
  const [sourceDoc, setSourceDoc] = useState(() => event?.citation.sourceDoc ?? 'Manual Entry');
  const [quote, setQuote] = useState(() => event?.citation.quote ?? 'Manually entered event');
  const [confidence, setConfidence] = useState(() => event?.citation.confidence ?? 'high');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !normalizedDate) return;

    const savedEvent: TimelineEvent = {
      id: event?.id || `manual-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      dateStr: dateStr || normalizedDate,
      normalizedDate,
      title,
      description,
      category,
      citation: {
        sourceDoc: sourceDoc || 'Manual Entry',
        quote: quote || 'N/A',
        confidence,
      },
    };

    onSave(savedEvent);
  };

  const footerActions = (
    <>
      <button 
        type="button" 
        className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border border-border-color cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-border-color/50 text-text-primary hover:bg-border-color hover:border-border-hover py-2 px-4 active:scale-[0.98]" 
        onClick={onClose}
      >
        Cancel
      </button>
      <button 
        type="submit" 
        className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border-none cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-brand-primary text-white hover:bg-brand-primary-hover py-2 px-4 active:scale-[0.98]"
      >
        Save Event
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Timeline Event' : 'Add Custom Event'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Title */}
        <FormField label="Event Title*">
          <Input
            type="text"
            required
            placeholder="e.g. Contract Signed, Deposition of Jane Smith"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Chronological Date (YYYY-MM-DD)*">
            <Input
              type="date"
              required
              value={normalizedDate}
              onChange={(e) => setNormalizedDate(e.target.value)}
            />
          </FormField>
          <FormField label="Written Date String (Optional)">
            <Input
              type="text"
              placeholder="e.g. October 14, 2025 at 11:03 AM"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </FormField>
        </div>

        {/* Category & Confidence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Category">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as TimelineEvent['category'])}
            >
              <option value="fact">Fact / General Event</option>
              <option value="communication">Communication (Email, Call, Chat)</option>
              <option value="transaction">Transaction (Contract, Payment)</option>
              <option value="incident">Incident / Dispute Event</option>
              <option value="legal">Legal Filing / Document</option>
              <option value="other">Other</option>
            </Select>
          </FormField>
          <FormField label="Confidence">
            <Select
              value={confidence}
              onChange={(e) => setConfidence(e.target.value as 'high' | 'medium' | 'low')}
            >
              <option value="high">High Confidence</option>
              <option value="medium">Medium Confidence</option>
              <option value="low">Low Confidence</option>
            </Select>
          </FormField>
        </div>

        {/* Description */}
        <FormField label="Event Description">
          <TextArea
            rows={2}
            placeholder="Detail what occurred in this event..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <hr className="border-t border-border-color my-1" />

        {/* Citation fields */}
        <FormField label="Source Citation Document">
          <Input
            type="text"
            placeholder="e.g. Exhibit A: Incident Log"
            value={sourceDoc}
            onChange={(e) => setSourceDoc(e.target.value)}
          />
        </FormField>

        <FormField label="Evidence Quote / Context Snippet">
          <TextArea
            rows={2}
            placeholder="Copy the exact supporting quote from source notes..."
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-4 pb-0 bg-transparent border-t border-border-color mt-2">
          {footerActions}
        </div>
      </form>
    </Modal>
  );
};
export default EventEditor;
