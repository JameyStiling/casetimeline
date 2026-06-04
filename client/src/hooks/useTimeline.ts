import { useState, useEffect, useRef, useCallback } from 'react';
import { apiClient } from '../services/apiClient';
import { runLocalHeuristicExtraction } from '../utils/extractor';
import { 
  APEX_DEMO_DOCS, 
  CONTRACT_DEMO_DOCS, 
  getApexMockEvents, 
  getContractMockEvents 
} from '../utils/mockData';
import type { CaseDocument } from '../components/DocumentInput';
import type { TimelineEvent } from '../components/TimelineView';

export function useTimeline() {
  // Config & State
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('gemini_api_key') || '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('apex');
  
  // App Core Data
  const [documents, setDocuments] = useState<CaseDocument[]>(APEX_DEMO_DOCS);
  const [events, setEvents] = useState<TimelineEvent[]>(() => getApexMockEvents());
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  
  // Extraction state
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStep, setExtractionStep] = useState(0);

  // UI states synchronized with URL query parameters (URL-as-state)
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('view');
    return mode === 'table' || mode === 'timeline' ? mode : 'timeline';
  });
  const [searchText, setSearchText] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'all';
  });

  // Sync state changes to URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (viewMode === 'timeline') {
      params.delete('view');
    } else {
      params.set('view', viewMode);
    }

    if (!searchText.trim()) {
      params.delete('q');
    } else {
      params.set('q', searchText);
    }

    if (selectedCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', selectedCategory);
    }

    const queryStr = params.toString();
    const targetUrl = `${window.location.pathname}${queryStr ? `?${queryStr}` : ''}`;
    window.history.replaceState(null, '', targetUrl);
  }, [viewMode, searchText, selectedCategory]);

  // Editor Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  // References for handling timers safely (preventing memory leaks on unmount)
  const stepIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  // Sync API key to localStorage
  useEffect(() => {
    localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

  // Fetch demo events with local fallback
  const fetchDemoEvents = useCallback(async (caseType: string) => {
    try {
      const demoEvents = await apiClient.fetchDemo(caseType);
      setEvents(demoEvents);
    } catch (e) {
      console.warn('Backend not responding, using frontend fallback for demo data.', e);
      if (caseType === 'contract') {
        setEvents(getContractMockEvents());
      } else {
        setEvents(getApexMockEvents());
      }
    }
  }, []);

  // Switch active case docs & load data
  const handleLoadDemo = useCallback((caseType: string) => {
    setSelectedEvent(null);
    if (caseType === 'contract') {
      setDocuments(CONTRACT_DEMO_DOCS);
      fetchDemoEvents('contract');
    } else {
      setDocuments(APEX_DEMO_DOCS);
      fetchDemoEvents('apex');
    }
  }, [fetchDemoEvents]);

  // Manage documents
  const handleAddDocument = useCallback(() => {
    setDocuments(prev => {
      const newId = `doc-${Date.now()}`;
      const newDoc: CaseDocument = {
        id: newId,
        name: `Document_${prev.length + 1}.txt`,
        content: ''
      };
      return [...prev, newDoc];
    });
  }, []);

  const handleUpdateDocument = useCallback((id: string, updates: Partial<CaseDocument>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  }, []);

  const handleRemoveDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  }, []);

  // Run AI timeline extraction
  const handleExtractTimeline = useCallback(async () => {
    // Clear any previous running extraction timers
    if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);

    setIsExtracting(true);
    setExtractionStep(0);
    setSelectedEvent(null);

    // Simulate progress steps for a highly polished feel
    stepIntervalRef.current = setInterval(() => {
      setExtractionStep(prev => {
        if (prev < 4) return prev + 1;
        if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
        return prev;
      });
    }, 1200);

    try {
      const parsedDocs = documents.map(d => ({ name: d.name, content: d.content }));
      const responseEvents = await apiClient.extractTimeline(parsedDocs, apiKey);
      
      loadingTimeoutRef.current = setTimeout(() => {
        setEvents(responseEvents);
        setIsExtracting(false);
        if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      }, 1000);

    } catch (err) {
      console.warn('Server endpoint failed or unavailable. Processing heuristically in the browser.', err);
      
      // Fallback: Run the extraction locally inside the frontend!
      loadingTimeoutRef.current = setTimeout(() => {
        const localEvents = runLocalHeuristicExtraction(documents);
        setEvents(localEvents);
        setIsExtracting(false);
        if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      }, 5000);
    }
  }, [documents, apiKey]);

  // Manage events (Edit/Create/Delete)
  const handleSaveEvent = useCallback((savedEvent: TimelineEvent) => {
    setEvents(prev => {
      const exists = prev.some(e => e.id === savedEvent.id);
      let updated;
      if (exists) {
        updated = prev.map(e => e.id === savedEvent.id ? savedEvent : e);
      } else {
        updated = [...prev, savedEvent];
      }
      return updated.sort((a, b) => a.normalizedDate.localeCompare(b.normalizedDate));
    });
    
    // Update selected event if it was the one edited
    setSelectedEvent(prev => prev?.id === savedEvent.id ? savedEvent : prev);
    setIsEditorOpen(false);
    setEditingEvent(null);
  }, []);

  const handleDeleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setSelectedEvent(prev => prev?.id === id ? null : prev);
  }, []);

  return {
    // API states
    apiKey,
    setApiKey,
    isSettingsOpen,
    setIsSettingsOpen,
    selectedDemo,
    setSelectedDemo,
    
    // App Data
    documents,
    events,
    selectedEvent,
    setSelectedEvent,
    
    // UI states
    isExtracting,
    extractionStep,
    viewMode,
    setViewMode,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    
    // Editor States
    isEditorOpen,
    setIsEditorOpen,
    editingEvent,
    setEditingEvent,

    // Callbacks
    handleLoadDemo,
    handleAddDocument,
    handleUpdateDocument,
    handleRemoveDocument,
    handleExtractTimeline,
    handleSaveEvent,
    handleDeleteEvent
  };
}
