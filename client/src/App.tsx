import { useState } from 'react';
import { useTimeline } from './hooks/useTimeline';
import { SettingsPanel } from './components/SettingsPanel';
import { DocumentInput } from './components/DocumentInput';
import { TimelineView } from './components/TimelineView';
import { CitationViewer } from './components/CitationViewer';
import { EventEditor } from './components/EventEditor';
import { ExportControls } from './components/ExportControls';

function App() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'evidence' | 'timeline'>('timeline');
  const {

    // API config
    apiKey,
    setApiKey,
    isSettingsOpen,
    setIsSettingsOpen,
    selectedDemo,
    setSelectedDemo,

    // Data
    documents,
    events,
    selectedEvent,
    setSelectedEvent,

    // UI States
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
    handleDeleteEvent,
  } = useTimeline();

  const getStepClass = (stepIdx: number) => {
    const base = "flex items-center gap-3 text-[0.8125rem] transition-all duration-150";
    if (extractionStep === stepIdx) {
      return `${base} text-brand-primary font-semibold`;
    }
    if (extractionStep > stepIdx) {
      return `${base} text-text-secondary`;
    }
    return `${base} text-text-muted`;
  };

  const getStepDotClass = (stepIdx: number) => {
    const base = "w-2 h-2 rounded-full transition-all duration-150";
    if (extractionStep === stepIdx) {
      return `${base} bg-brand-primary shadow-[0_0_10px_#6366f1]`;
    }
    if (extractionStep > stepIdx) {
      return `${base} bg-brand-accent`;
    }
    return `${base} bg-text-muted`;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-main text-text-primary">
      {/* Header */}
      <header className="h-[70px] flex items-center justify-between px-4 sm:px-8 bg-[#0e1423] border-b border-border-color z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center font-display font-extrabold text-[1.25rem] text-white shadow-[0_0_20px_rgba(99,102,241,0.15)] select-none">
            C
          </div>
          <h1 className="font-display text-[1.05rem] sm:text-[1.15rem] font-bold text-text-primary tracking-tight select-none">
            <span className="hidden sm:inline">Case </span>Timeline
            <span className="hidden sm:inline"> Builder</span>
          </h1>
          <span className="text-[0.65rem] font-semibold uppercase bg-brand-primary/15 text-brand-primary px-2 py-0.5 rounded-full border border-brand-primary/30 select-none">
            MVP
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border border-border-color cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-border-color/50 text-text-primary hover:bg-border-color hover:border-border-hover py-2 px-2.5 sm:px-3.5 shadow-sm active:scale-[0.98]" 
            onClick={() => setIsSettingsOpen(true)}
            title="Settings & Demos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:mr-0.5">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span className="hidden sm:inline">Settings & Demos</span>
          </button>

          <ExportControls events={events} />
        </div>
      </header>

      {/* Main App Workspace */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative w-full">
        {/* Mobile Tab Bar */}
        <div className="flex lg:hidden bg-[#0e1423] border-b border-border-color shrink-0">
          <button
            type="button"
            className={`flex-1 py-3 text-center text-[0.8125rem] sm:text-[0.875rem] font-semibold border-b-2 transition-all duration-150 cursor-pointer ${activeWorkspaceTab === 'evidence' ? 'border-brand-primary text-text-primary bg-brand-primary/[0.03]' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
            onClick={() => setActiveWorkspaceTab('evidence')}
          >
            Evidence Docs ({documents.length})
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-center text-[0.8125rem] sm:text-[0.875rem] font-semibold border-b-2 transition-all duration-150 cursor-pointer ${activeWorkspaceTab === 'timeline' ? 'border-brand-primary text-text-primary bg-brand-primary/[0.03]' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
            onClick={() => setActiveWorkspaceTab('timeline')}
          >
            Timeline ({events.length})
          </button>
        </div>

        {/* Left Hand Document Management Panel */}
        <div className={`w-full lg:w-[380px] shrink-0 bg-[#0e1423] border-b lg:border-b-0 lg:border-r border-border-color flex-col overflow-hidden ${activeWorkspaceTab === 'evidence' ? 'flex' : 'hidden lg:flex'}`}>
          <DocumentInput
            documents={documents}
            onAddDocument={handleAddDocument}
            onUpdateDocument={handleUpdateDocument}
            onRemoveDocument={handleRemoveDocument}
            onExtract={handleExtractTimeline}
            isExtracting={isExtracting}
          />
        </div>

        {/* Right Hand Timeline Panels */}
        {isExtracting ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-main gap-8 text-center animate-fade-in duration-300">
            <div className="w-10 h-10 border-3 border-white/10 border-t-brand-primary rounded-full animate-spin shadow-[0_0_20px_rgba(99,102,241,0.15)]" />
            <div>
              <h2 className="font-display text-[1.4rem] font-bold text-text-primary mb-1">AI Timeline Extraction</h2>
              <p className="text-[0.9rem] text-text-secondary">Analyzing documents for dates, facts, and citations...</p>
            </div>

            <div className="flex flex-col gap-3 text-left w-full max-w-[320px] bg-card/50 p-5 rounded-xl border border-border-color">
              <div className={getStepClass(0)}>
                <div className={getStepDotClass(0)} />
                <span>Ingesting case documents & notes</span>
              </div>
              <div className={getStepClass(1)}>
                <div className={getStepDotClass(1)} />
                <span>Scanning date patterns & text anchors</span>
              </div>
              <div className={getStepClass(2)}>
                <div className={getStepDotClass(2)} />
                <span>Extracting events & contextual statements</span>
              </div>
              <div className={getStepClass(3)}>
                <div className={getStepDotClass(3)} />
                <span>Resolving chronological ordering</span>
              </div>
              <div className={getStepClass(4)}>
                <div className={getStepDotClass(4)} />
                <span>Formatting source citations & verifying evidence</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={`flex-1 flex flex-col min-w-0 ${activeWorkspaceTab === 'timeline' ? 'flex' : 'hidden lg:flex'}`}>
            <TimelineView
              events={events}
              selectedEventId={selectedEvent?.id || null}
              onSelectEvent={setSelectedEvent}
              onEditEvent={(e) => {
                setEditingEvent(e);
                setIsEditorOpen(true);
              }}
              onDeleteEvent={handleDeleteEvent}
              onAddEventClick={() => {
                setEditingEvent(null);
                setIsEditorOpen(true);
              }}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchText={searchText}
              setSearchText={setSearchText}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        )}

        {/* Sliding Citation Panel */}
        <CitationViewer
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>


      {/* Editor Modal */}
      {isEditorOpen && (
        <EventEditor
          key={editingEvent?.id || 'new'}
          isOpen={isEditorOpen}
          event={editingEvent}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}

      {/* Settings / Demo Load modal */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onChangeApiKey={setApiKey}
        selectedDemo={selectedDemo}
        onSelectDemo={setSelectedDemo}
        onLoadDemo={handleLoadDemo}
      />
    </div>
  );
}

export default App;
