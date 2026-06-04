import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from './logger.js';

export interface Citation {
  sourceDoc: string;
  quote: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface TimelineEvent {
  id: string;
  dateStr: string;
  normalizedDate: string; // YYYY-MM-DD
  title: string;
  description: string;
  category: 'communication' | 'fact' | 'transaction' | 'incident' | 'legal' | 'other';
  citation: Citation;
}

export const APEX_DEMO_EVENTS: TimelineEvent[] = [
  {
    id: "apex-1",
    dateStr: "September 22, 2025 at 9:14 PM",
    normalizedDate: "2025-09-22",
    title: "IP Transfer Discussion",
    description: "Alex (Lead Engineer at Apex) and Sarah (CEO of Nova) text about transfer of technology and hiring terms.",
    category: "communication",
    citation: {
      sourceDoc: "Exhibit D: Text Messages (Alex-Sarah)",
      quote: "Sarah: 'If you bring the core matching schemas over, we can match your current salary and add 15% equity.' Alex: 'I can package the core module in a clean folder.'",
      confidence: "high"
    }
  },
  {
    id: "apex-2",
    dateStr: "October 12, 2025",
    normalizedDate: "2025-10-12",
    title: "Apex Proprietary Architecture Frozen",
    description: "Apex systems record a final code baseline freeze for the Core Matching Algorithm, Version 4.2.",
    category: "fact",
    citation: {
      sourceDoc: "Exhibit A: Apex System Logs",
      quote: "System baseline freeze completed for repository apex-match-engine: v4.2 at 18:30 GMT.",
      confidence: "medium"
    }
  },
  {
    id: "apex-3",
    dateStr: "October 14, 2025 at 11:03 AM",
    normalizedDate: "2025-10-14",
    title: "Proprietary Algorithm Emailed to Competitor",
    description: "Alex sends an encrypted PDF file containing the proprietary Apex matching algorithm details to Nova CEO Sarah.",
    category: "communication",
    citation: {
      sourceDoc: "Exhibit A: Recovered Sent Email Logs",
      quote: "To: sarah@novatech.com, Attachment: core_matching_algorithm.pdf. Body: 'Here is the math we discussed. Keep this offline.'",
      confidence: "high"
    }
  },
  {
    id: "apex-4",
    dateStr: "October 20, 2025",
    normalizedDate: "2025-10-20",
    title: "Alex Resigns from Apex",
    description: "Alex submits a formal resignation letter to Apex HR, citing a desire to pursue personal projects.",
    category: "legal",
    citation: {
      sourceDoc: "Exhibit B: Resignation Letter",
      quote: "Please accept this letter as formal notification that I am resigning from my position as Lead Engineer. My last day will be November 3, 2025. I plan to take time to pursue personal projects.",
      confidence: "high"
    }
  },
  {
    id: "apex-5",
    dateStr: "November 3, 2025 at 8:45 AM",
    normalizedDate: "2025-11-03",
    title: "Alex Joins Nova Tech",
    description: "Alex is officially onboarded at Nova Tech as VP of Engineering.",
    category: "transaction",
    citation: {
      sourceDoc: "Exhibit C: Nova Employment Agreement",
      quote: "This Employment Agreement is entered into on November 3, 2025, between Nova Technologies LLC and Alex Mercer for the role of VP of Engineering.",
      confidence: "high"
    }
  },
  {
    id: "apex-6",
    dateStr: "November 3, 2025 at 11:50 PM",
    normalizedDate: "2025-11-03",
    title: "Nova Engine Codebase Commit",
    description: "Alex makes a massive code commit to the Nova repository establishing their new matching module, containing copied variables from Apex.",
    category: "fact",
    citation: {
      sourceDoc: "Exhibit C: Nova Git Repository Logs",
      quote: "Commit: c3f89a1 - Add NovaMatchEngine modules. Refactored variables 'apex_match_coeff' and 'threshold_matrix_v4' observed in lines 23-45.",
      confidence: "high"
    }
  },
  {
    id: "apex-7",
    dateStr: "November 18, 2025",
    normalizedDate: "2025-11-18",
    title: "Cease and Desist Sent",
    description: "Apex legal counsel sends a formal Cease & Desist letter to Nova regarding intellectual property infringement.",
    category: "legal",
    citation: {
      sourceDoc: "Exhibit E: Legal Correspondence",
      quote: "We demand that Nova Technologies immediately cease and desist all development and utilization of matching engines incorporating Apex proprietary algorithms.",
      confidence: "high"
    }
  }
];

export const CONTRACT_DEMO_EVENTS: TimelineEvent[] = [
  {
    id: "contract-1",
    dateStr: "March 1, 2025",
    normalizedDate: "2025-03-01",
    title: "Contract Signed",
    description: "Arthur Pendelton and Vanguard Developers sign the contract for the construction of Pendelton Manor.",
    category: "transaction",
    citation: {
      sourceDoc: "Exhibit A: Prime Agreement",
      quote: "This contract is executed on March 1, 2025. Construction shall commence immediately, with substantial completion target set for December 1, 2025.",
      confidence: "high"
    }
  },
  {
    id: "contract-2",
    dateStr: "April 15, 2025",
    normalizedDate: "2025-04-15",
    title: "Subsurface Rock Discovered",
    description: "Geotechnical survey reports massive subsurface granite deposits, preventing foundation drilling.",
    category: "fact",
    citation: {
      sourceDoc: "Exhibit B: Geotechnical Survey Report",
      quote: "Core boring at Grid B-4 on April 15, 2025, hit solid granite at 4 feet. Standard excavation equipment cannot proceed.",
      confidence: "high"
    }
  },
  {
    id: "contract-3",
    dateStr: "April 18, 2025",
    normalizedDate: "2025-04-18",
    title: "Extension Request Submitted",
    description: "Vanguard Developers requests a 45-day extension and $40,000 budget adjustment to clear rock.",
    category: "communication",
    citation: {
      sourceDoc: "Exhibit C: Project Email Correspondence",
      quote: "From: Vanguard PM To: Arthur Pendelton. 'Due to the granite encountered, we need a 45-day contract extension and $40,000 for specialized pneumatic splitters.'",
      confidence: "high"
    }
  },
  {
    id: "contract-4",
    dateStr: "April 22, 2025",
    normalizedDate: "2025-04-22",
    title: "Extension Request Denied",
    description: "Arthur Pendelton denies both the extension and budget increase, citing pre-contract survey obligations.",
    category: "communication",
    citation: {
      sourceDoc: "Exhibit D: Response Letter",
      quote: "To Vanguard Developers: 'Your request for additional funds and time is denied. Under Section 4.2, site inspection risks are fully borne by the Contractor.'",
      confidence: "high"
    }
  },
  {
    id: "contract-5",
    dateStr: "October 10, 2025",
    normalizedDate: "2025-10-10",
    title: "Work Site Walkout",
    description: "Vanguard Developers halts all work on Pendelton Manor, citing non-payment of milestone invoice #3.",
    category: "incident",
    citation: {
      sourceDoc: "Exhibit E: Site Manager Log",
      quote: "10/10/25: Vanguard crew packed up equipment and left site at 10:00 AM. Subcontractor payments are overdue.",
      confidence: "high"
    }
  },
  {
    id: "contract-6",
    dateStr: "December 2, 2025",
    normalizedDate: "2025-12-02",
    title: "Project Deadline Breached",
    description: "The substantial completion deadline passes with the manor only 65% complete.",
    category: "legal",
    citation: {
      sourceDoc: "Exhibit A: Prime Agreement / Site Survey",
      quote: "Completion deadline: Dec 1, 2025. Site survey on Dec 2 reveals foundation and framing complete, but zero interior or roof finishing.",
      confidence: "medium"
    }
  }
];

// Heuristic dates parser helper for custom document parsing (mock mode)
function extractEventsHeuristically(text: string, documentName: string): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  
  // Look for paragraphs or lines
  const sections = text.split(/\n+/);
  
  // Date regex patterns
  // Pattern 1: Month Day, Year (e.g. October 14, 2025 or Oct 14, 2025)
  // Pattern 2: MM/DD/YYYY or YYYY-MM-DD
  const dateRegex1 = /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),?\s+(\d{4})\b/i;
  const dateRegex2 = /\b(\d{4})[-/](\d{1,2})[-/](\d{1,2})\b/;
  const dateRegex3 = /\b(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})\b/;

  let idCounter = 1;

  for (let section of sections) {
    section = section.trim();
    if (section.length < 15) continue; // Skip very short lines

    let dateMatch = section.match(dateRegex1) || section.match(dateRegex2) || section.match(dateRegex3);
    
    if (dateMatch) {
      const dateStr = dateMatch[0];
      let normalizedDate = "2025-01-01"; // Default fallback
      
      try {
        const parsedDate = new Date(dateStr);
        if (!isNaN(parsedDate.getTime())) {
          normalizedDate = parsedDate.toISOString().split('T')[0];
        }
      } catch (e) {
        // Date parsing failed, keep default
      }

      // Determine category based on keywords
      let category: TimelineEvent['category'] = 'fact';
      const lowercaseSec = section.toLowerCase();
      if (lowercaseSec.includes('email') || lowercaseSec.includes('sent') || lowercaseSec.includes('texted') || lowercaseSec.includes('call') || lowercaseSec.includes('wrote') || lowercaseSec.includes('discuss')) {
        category = 'communication';
      } else if (lowercaseSec.includes('signed') || lowercaseSec.includes('paid') || lowercaseSec.includes('bought') || lowercaseSec.includes('invoice') || lowercaseSec.includes('contract') || lowercaseSec.includes('transaction')) {
        category = 'transaction';
      } else if (lowercaseSec.includes('sued') || lowercaseSec.includes('legal') || lowercaseSec.includes('court') || lowercaseSec.includes('filed') || lowercaseSec.includes('lawyer') || lowercaseSec.includes('counsel')) {
        category = 'legal';
      } else if (lowercaseSec.includes('accident') || lowercaseSec.includes('halted') || lowercaseSec.includes('quit') || lowercaseSec.includes('stole') || lowercaseSec.includes('breached') || lowercaseSec.includes('broke')) {
        category = 'incident';
      }

      // Create a reasonable title (first 4-6 words of the sentence, excluding the date if possible)
      let cleanTextForTitle = section.replace(dateStr, '').replace(/^[,\s.:;]+/, '').trim();
      const words = cleanTextForTitle.split(/\s+/);
      const titleWords = words.slice(0, Math.min(5, words.length));
      let title = titleWords.join(' ');
      if (title.length > 40) {
        title = title.substring(0, 37) + '...';
      }
      if (!title || title === '...') {
        title = `Event on ${dateStr}`;
      }
      
      // Clean up title capitalization/punctuation
      title = title.charAt(0).toUpperCase() + title.slice(1);
      if (title.endsWith('.') || title.endsWith(',')) {
        title = title.slice(0, -1);
      }

      events.push({
        id: `extracted-${idCounter++}-${Math.random().toString(36).substr(2, 4)}`,
        dateStr,
        normalizedDate,
        title,
        description: section,
        category,
        citation: {
          sourceDoc: documentName || "Uploaded Document",
          quote: section,
          confidence: "medium"
        }
      });
    }
  }

  // If no dates were found, split the text into 3 mock chronological events just so the user gets a result
  if (events.length === 0) {
    events.push({
      id: `extracted-fallback-1`,
      dateStr: "Recent (Undated)",
      normalizedDate: "2026-01-01",
      title: "Content Analysis",
      description: text.length > 200 ? text.substring(0, 200) + "..." : text,
      category: "fact",
      citation: {
        sourceDoc: documentName || "Uploaded Document",
        quote: text.substring(0, Math.min(100, text.length)),
        confidence: "low"
      }
    });
  }

  return events;
}

export async function extractTimeline(
  documents: { name: string; content: string }[],
  apiKey?: string
): Promise<TimelineEvent[]> {
  // If API Key is provided, try to make a real Gemini API call
  if (apiKey && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        You are an expert litigation timeline builder. Your job is to analyze the following case documents/notes and extract key events, chronologically ordering them, and citing the exact source documents.
        
        For each event, you must extract:
        1. dateStr: The date and time as written in the text.
        2. normalizedDate: A YYYY-MM-DD formatted date for chronological sorting (use best guess or default day if month/year are present, e.g. "October 2025" -> "2025-10-01").
        3. title: A short, punchy, professional title.
        4. description: A 1-2 sentence description of what occurred and who was involved.
        5. category: One of: "communication", "fact", "transaction", "incident", "legal", "other".
        6. citation: An object containing:
           - sourceDoc: The exact name of the source document.
           - quote: The exact sentence or clause from the document that verifies this event.
           - confidence: "high", "medium", or "low".

        Documents to analyze:
        ${documents.map(doc => `--- DOCUMENT NAME: ${doc.name} ---\n${doc.content}\n--- END DOCUMENT ---`).join('\n\n')}

        Return your output as a single JSON object matching the JSON schema. Be extremely thorough. Extract all relevant events. Do not skip dates. Ensure they are chronologically ordered by normalizedDate.
      `;

      const responseSchema = {
        type: "object",
        properties: {
          events: {
            type: "array",
            items: {
              type: "object",
              properties: {
                dateStr: { type: "string" },
                normalizedDate: { type: "string", description: "YYYY-MM-DD format" },
                title: { type: "string" },
                description: { type: "string" },
                category: { type: "string", enum: ["communication", "fact", "transaction", "incident", "legal", "other"] },
                citation: {
                  type: "object",
                  properties: {
                    sourceDoc: { type: "string" },
                    quote: { type: "string" },
                    confidence: { type: "string", enum: ["high", "medium", "low"] }
                  },
                  required: ["sourceDoc", "quote", "confidence"]
                }
              },
              required: ["dateStr", "normalizedDate", "title", "description", "category", "citation"]
            }
          }
        },
        required: ["events"]
      };

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: responseSchema
        } as any
      });

      const textResponse = result.response.text();
      const parsed = JSON.parse(textResponse);
      
      if (parsed && Array.isArray(parsed.events)) {
        return parsed.events.map((e: any, index: number) => ({
          ...e,
          id: `gemini-${index}-${Math.random().toString(36).substr(2, 4)}`
        })) as TimelineEvent[];
      }
    } catch (error) {
      logger.error(error, "Gemini API call failed, falling back to heuristic parsing");
      // Fall through to heuristic extractor
    }
  }

  // Fallback / Mock Mode: Parse heuristically
  logger.info("Running heuristic extraction (mock fallback)");
  let allEvents: TimelineEvent[] = [];
  for (const doc of documents) {
    const docEvents = extractEventsHeuristically(doc.content, doc.name);
    allEvents = allEvents.concat(docEvents);
  }

  // Sort chronologically
  return allEvents.sort((a, b) => {
    return a.normalizedDate.localeCompare(b.normalizedDate);
  });
}
