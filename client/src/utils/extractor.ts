import type { CaseDocument } from '../components/DocumentInput';
import type { TimelineEvent } from '../components/TimelineView';

export function runLocalHeuristicExtraction(documents: CaseDocument[]): TimelineEvent[] {
  const extracted: TimelineEvent[] = [];
  
  const dateRegex1 = /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),?\s+(\d{4})\b/i;
  const dateRegex2 = /\b(\d{4})[-/](\d{1,2})[-/](\d{1,2})\b/;
  const dateRegex3 = /\b(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})\b/;

  let idCounter = 1;

  for (const doc of documents) {
    const lines = doc.content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length < 15) continue;

      const dateMatch = trimmed.match(dateRegex1) || trimmed.match(dateRegex2) || trimmed.match(dateRegex3);
      if (dateMatch) {
        const dateStr = dateMatch[0];
        let normalizedDate = '2025-01-01';
        
        try {
          const parsed = new Date(dateStr);
          if (!isNaN(parsed.getTime())) {
            normalizedDate = parsed.toISOString().split('T')[0];
          }
        } catch {
          // Keep default
        }

        let category: TimelineEvent['category'] = 'fact';
        const lower = trimmed.toLowerCase();
        if (lower.includes('email') || lower.includes('sent') || lower.includes('texted') || lower.includes('call') || lower.includes('wrote') || lower.includes('discuss')) {
          category = 'communication';
        } else if (lower.includes('signed') || lower.includes('paid') || lower.includes('bought') || lower.includes('invoice') || lower.includes('contract') || lower.includes('transaction')) {
          category = 'transaction';
        } else if (lower.includes('sued') || lower.includes('legal') || lower.includes('court') || lower.includes('filed') || lower.includes('lawyer') || lower.includes('counsel')) {
          category = 'legal';
        } else if (lower.includes('accident') || lower.includes('halted') || lower.includes('quit') || lower.includes('stole') || lower.includes('breached') || lower.includes('broke')) {
          category = 'incident';
        }

        const cleanText = trimmed.replace(dateStr, '').replace(/^[,\s.:;]+/, '').trim();
        const words = cleanText.split(/\s+/);
        const titleWords = words.slice(0, Math.min(5, words.length));
        let title = titleWords.join(' ');
        if (title.length > 40) title = title.substring(0, 37) + '...';
        if (!title || title === '...') title = `Event on ${dateStr}`;

        title = title.charAt(0).toUpperCase() + title.slice(1);
        if (title.endsWith('.') || title.endsWith(',')) title = title.slice(0, -1);

        // Standard Web Crypto UUID is fully supported in all modern browsers
        const uniqueId = typeof window !== 'undefined' && window.crypto?.randomUUID 
          ? window.crypto.randomUUID() 
          : `local-${idCounter++}-${Date.now().toString(36)}`;

        extracted.push({
          id: uniqueId,
          dateStr,
          normalizedDate,
          title,
          description: trimmed,
          category,
          citation: {
            sourceDoc: doc.name,
            quote: trimmed,
            confidence: 'medium'
          }
        });
      }
    }
  }

  if (extracted.length === 0 && documents.length > 0) {
    extracted.push({
      id: 'local-fallback',
      dateStr: 'Recent (Undated)',
      normalizedDate: '2026-01-01',
      title: 'Content Analysis',
      description: 'We found no explicit dates in your notes, so we loaded this summary.',
      category: 'fact',
      citation: {
        sourceDoc: documents[0]?.name || 'Case Notes',
        quote: 'N/A',
        confidence: 'low'
      }
    });
  }

  return extracted.sort((a, b) => a.normalizedDate.localeCompare(b.normalizedDate));
}
