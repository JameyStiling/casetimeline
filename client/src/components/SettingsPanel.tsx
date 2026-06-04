import React from 'react';
import { Modal } from './ui/Modal';
import { FormField, Input } from './ui/Form';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onChangeApiKey: (key: string) => void;
  selectedDemo: string;
  onSelectDemo: (demo: string) => void;
  onLoadDemo: (demo: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  apiKey,
  onChangeApiKey,
  selectedDemo,
  onSelectDemo,
  onLoadDemo,
}) => {
  const handleLoad = () => {
    onLoadDemo(selectedDemo);
    onClose();
  };

  const footerActions = (
    <>
      <button 
        className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border border-border-color cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-border-color/50 text-text-primary hover:bg-border-color hover:border-border-hover py-2 px-4 active:scale-[0.98]" 
        onClick={handleLoad}
      >
        Load Case Data
      </button>
      <button 
        className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border-none cursor-pointer transition-all duration-150 text-decoration-none outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-brand-primary text-white hover:bg-brand-primary-hover py-2 px-4 active:scale-[0.98]" 
        onClick={onClose}
      >
        Done
      </button>
    </>
  );

  const cardBaseClass = "border rounded-lg p-4 flex flex-row gap-4 items-start cursor-pointer transition-all duration-150 hover:bg-card-hover hover:border-border-hover";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings & Demo Scenarios"
      footer={footerActions}
    >
      <div className="flex flex-col gap-5">
        {/* Gemini API Key */}
        <FormField label="Gemini API Key (Optional)">
          <Input
            type="password"
            placeholder="Paste your Gemini API Key here..."
            value={apiKey}
            onChange={(e) => onChangeApiKey(e.target.value)}
          />
          <p className="text-[0.75rem] text-text-muted mt-1 leading-relaxed">
            Your API Key is stored locally in your browser and used only to make extraction requests. 
            If left blank, the app will run in **Demo/Mock Mode** using high-fidelity local models.
          </p>
        </FormField>

        <hr className="border-t border-border-color my-1" />

        {/* Presets */}
        <FormField label="Select Pre-loaded Demo Case">
          <div className="flex flex-col gap-3">
            <label 
              className={`${cardBaseClass} ${selectedDemo === 'apex' ? 'border-brand-primary bg-brand-primary/[0.05]' : 'bg-card border-border-color'}`}
            >
              <input 
                type="radio" 
                name="demo-case" 
                value="apex"
                checked={selectedDemo === 'apex'}
                onChange={() => onSelectDemo('apex')}
                className="mt-1 accent-brand-primary cursor-pointer"
              />
              <div className="flex-1">
                <div className="text-[0.875rem] font-semibold text-text-primary">Apex vs. Nova (Trade Secret Theft)</div>
                <div className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                  Chronicles an engineer resigning, stealing source algorithms, and committing them to a competitor's repo.
                </div>
              </div>
            </label>

            <label 
              className={`${cardBaseClass} ${selectedDemo === 'contract' ? 'border-brand-primary bg-brand-primary/[0.05]' : 'bg-card border-border-color'}`}
            >
              <input 
                type="radio" 
                name="demo-case" 
                value="contract"
                checked={selectedDemo === 'contract'}
                onChange={() => onSelectDemo('contract')}
                className="mt-1 accent-brand-primary cursor-pointer"
              />
              <div className="flex-1">
                <div className="text-[0.875rem] font-semibold text-text-primary">Estate of Pendelton (Contract Dispute)</div>
                <div className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                  Tracks a construction project timeline, geotechnical rock discovery, extensions denied, and site abandonment.
                </div>
              </div>
            </label>
          </div>
        </FormField>
      </div>
    </Modal>
  );
};
export default SettingsPanel;
