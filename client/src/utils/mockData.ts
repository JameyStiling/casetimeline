import type { CaseDocument } from '../components/DocumentInput';
import type { TimelineEvent } from '../components/TimelineView';

export const APEX_DEMO_DOCS: CaseDocument[] = [
  {
    id: 'apex-doc-1',
    name: 'Exhibit A - Extracted Email Logs.txt',
    content: `Date: October 14, 2025 at 11:03 AM
From: Alex Mercer <alex.m@apextech.com>
To: Sarah Jenkins <sarah@novatech.com>
Subject: Engine Math Overview

Sarah,
Here is the math we discussed. Keep this offline and do not distribute outside the core team.
Attachment: core_matching_algorithm.pdf (Contains system baseline parameters, threshold matrices, and apex_match_coeff adjustments).

I've finalized my transition plan. My last day will be November 3rd.`
  },
  {
    id: 'apex-doc-2',
    name: 'Exhibit B - Resignation Letter.txt',
    content: `October 20, 2025
To: Apex HR & Engineering Leadership
From: Alex Mercer

Please accept this letter as formal notification that I am resigning from my position as Lead Engineer at Apex Tech. My last day will be November 3, 2025. I plan to take time to pursue personal projects and spend time with family.

Sincerely,
Alex Mercer`
  },
  {
    id: 'apex-doc-3',
    name: 'Exhibit C - Nova Employment Agreement.txt',
    content: `Nova Technologies Employment Agreement:
This Employment Agreement is entered into on November 3, 2025, between Nova Technologies LLC and Alex Mercer for the role of VP of Engineering.

Nova Repository Git Logs:
Date: November 3, 2025 at 11:50 PM
Commit: c3f89a1
Author: Alex Mercer <alex.m@novatech.com>
Comment: Add NovaMatchEngine modules.
Changes: Refactored variables 'apex_match_coeff' and 'threshold_matrix_v4' observed in lines 23-45.`
  },
  {
    id: 'apex-doc-4',
    name: 'Exhibit D - SMS Logs (Alex & Sarah).txt',
    content: `Sept 22, 2025, 9:12 PM - Sarah: Hey Alex, have you thought about the offer?
Sept 22, 2025, 9:14 PM - Sarah: If you bring the core matching schemas over, we can match your current salary and add 15% equity.
Sept 22, 2025, 9:15 PM - Alex: I can package the core module in a clean folder. It's technically trade-secret protected but the auditing is light right now.`
  }
];

export const CONTRACT_DEMO_DOCS: CaseDocument[] = [
  {
    id: 'contract-doc-1',
    name: 'Exhibit A - Prime Construction Contract.txt',
    content: `This contract is executed on March 1, 2025. Construction of Pendelton Manor shall commence immediately. Substantial completion target set for December 1, 2025. Late completions are subject to liquidated damages of $5,000 per day.`
  },
  {
    id: 'contract-doc-2',
    name: 'Exhibit B - Geotechnical Survey.txt',
    content: `Report Date: April 15, 2025
Core boring at Grid B-4 on April 15, 2025, hit solid granite at 4 feet. Standard excavation equipment cannot proceed. Specialized hydraulic splitters required.`
  },
  {
    id: 'contract-doc-3',
    name: 'Exhibit C - Project Emails.txt',
    content: `Date: April 18, 2025
From: Vanguard PM To: Arthur Pendelton
Subject: Extension Request
Due to the granite encountered, we need a 45-day contract extension and $40,000 for specialized pneumatic splitters.

Date: April 22, 2025
From: Arthur Pendelton To: Vanguard PM
Subject: Re: Extension Request
Your request for additional funds and time is denied. Under Section 4.2, site inspection risks are fully borne by the Contractor.`
  },
  {
    id: 'contract-doc-4',
    name: 'Exhibit E - Site Manager Daily Logs.txt',
    content: `10/10/25: Vanguard crew packed up equipment and left site at 10:00 AM. Subcontractor payments are overdue. Work is fully halted.

Site survey on Dec 2 reveals foundation and framing complete, but zero interior or roof finishing. Deadline of Dec 1 is breached.`
  }
];

export function getApexMockEvents(): TimelineEvent[] {
  return [
    {
      id: 'apex-1',
      dateStr: 'September 22, 2025 at 9:14 PM',
      normalizedDate: '2025-09-22',
      title: 'IP Transfer Discussion',
      description: 'Alex (Lead Engineer at Apex) and Sarah (CEO of Nova) text about transfer of technology and hiring terms.',
      category: 'communication',
      citation: {
        sourceDoc: 'Exhibit D - SMS Logs (Alex & Sarah).txt',
        quote: "Sarah: 'If you bring the core matching schemas over, we can match your current salary and add 15% equity.' Alex: 'I can package the core module in a clean folder.'",
        confidence: 'high'
      }
    },
    {
      id: 'apex-3',
      dateStr: 'October 14, 2025 at 11:03 AM',
      normalizedDate: '2025-10-14',
      title: 'Proprietary Algorithm Emailed to Competitor',
      description: 'Alex sends an encrypted PDF file containing the proprietary Apex matching algorithm details to Nova CEO Sarah.',
      category: 'communication',
      citation: {
        sourceDoc: 'Exhibit A - Extracted Email Logs.txt',
        quote: "To: sarah@novatech.com, Attachment: core_matching_algorithm.pdf. Body: 'Here is the math we discussed. Keep this offline.'",
        confidence: 'high'
      }
    },
    {
      id: 'apex-4',
      dateStr: 'October 20, 2025',
      normalizedDate: '2025-10-20',
      title: 'Alex Resigns from Apex',
      description: 'Alex submits a formal resignation letter to Apex HR, citing a desire to pursue personal projects.',
      category: 'legal',
      citation: {
        sourceDoc: 'Exhibit B - Resignation Letter.txt',
        quote: 'Please accept this letter as formal notification that I am resigning from my position as Lead Engineer. My last day will be November 3, 2025. I plan to take time to pursue personal projects.',
        confidence: 'high'
      }
    },
    {
      id: 'apex-5',
      dateStr: 'November 3, 2025 at 8:45 AM',
      normalizedDate: '2025-11-03',
      title: 'Alex Joins Nova Tech',
      description: 'Alex is officially onboarded at Nova Tech as VP of Engineering.',
      category: 'transaction',
      citation: {
        sourceDoc: 'Exhibit C - Nova Employment Agreement.txt',
        quote: 'This Employment Agreement is entered into on November 3, 2025, between Nova Technologies LLC and Alex Mercer for the role of VP of Engineering.',
        confidence: 'high'
      }
    },
    {
      id: 'apex-6',
      dateStr: 'November 3, 2025 at 11:50 PM',
      normalizedDate: '2025-11-03',
      title: 'Nova Engine Codebase Commit',
      description: 'Alex makes a massive code commit to the Nova repository establishing their new matching module, containing copied variables from Apex.',
      category: 'fact',
      citation: {
        sourceDoc: 'Exhibit C - Nova Employment Agreement.txt',
        quote: "Commit: c3f89a1 - Add NovaMatchEngine modules. Refactored variables 'apex_match_coeff' and 'threshold_matrix_v4' observed in lines 23-45.",
        confidence: 'high'
      }
    }
  ];
}

export function getContractMockEvents(): TimelineEvent[] {
  return [
    {
      id: 'contract-1',
      dateStr: 'March 1, 2025',
      normalizedDate: '2025-03-01',
      title: 'Contract Signed',
      description: 'Arthur Pendelton and Vanguard Developers sign the contract for the construction of Pendelton Manor.',
      category: 'transaction',
      citation: {
        sourceDoc: 'Exhibit A - Prime Construction Contract.txt',
        quote: 'This contract is executed on March 1, 2025. Construction shall commence immediately, with substantial completion target set for December 1, 2025.',
        confidence: 'high'
      }
    },
    {
      id: 'contract-2',
      dateStr: 'April 15, 2025',
      normalizedDate: '2025-04-15',
      title: 'Subsurface Rock Discovered',
      description: 'Geotechnical survey reports massive subsurface granite deposits, preventing foundation drilling.',
      category: 'fact',
      citation: {
        sourceDoc: 'Exhibit B - Geotechnical Survey.txt',
        quote: 'Core boring at Grid B-4 on April 15, 2025, hit solid granite at 4 feet. Standard excavation equipment cannot proceed.',
        confidence: 'high'
      }
    },
    {
      id: 'contract-3',
      dateStr: 'April 18, 2025',
      normalizedDate: '2025-04-18',
      title: 'Extension Request Submitted',
      description: 'Vanguard Developers requests a 45-day extension and $40,000 budget adjustment to clear rock.',
      category: 'communication',
      citation: {
        sourceDoc: 'Exhibit C - Project Emails.txt',
        quote: "From: Vanguard PM To: Arthur Pendelton. 'Due to the granite encountered, we need a 45-day contract extension and $40,000 for specialized pneumatic splitters.'",
        confidence: 'high'
      }
    },
    {
      id: 'contract-4',
      dateStr: 'April 22, 2025',
      normalizedDate: '2025-04-22',
      title: 'Extension Request Denied',
      description: 'Arthur Pendelton denies both the extension and budget increase, citing pre-contract survey obligations.',
      category: 'communication',
      citation: {
        sourceDoc: 'Exhibit C - Project Emails.txt',
        quote: "To Vanguard Developers: 'Your request for additional funds and time is denied. Under Section 4.2, site inspection risks are fully borne by the Contractor.'",
        confidence: 'high'
      }
    },
    {
      id: 'contract-5',
      dateStr: 'October 10, 2025',
      normalizedDate: '2025-10-10',
      title: 'Work Site Walkout',
      description: 'Vanguard Developers halts all work on Pendelton Manor, citing non-payment of milestone invoice #3.',
      category: 'incident',
      citation: {
        sourceDoc: 'Exhibit E - Site Manager Daily Logs.txt',
        quote: '10/10/25: Vanguard crew packed up equipment and left site at 10:00 AM. Subcontractor payments are overdue.',
        confidence: 'high'
      }
    }
  ];
}
