import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.78rem] font-semibold text-text-secondary uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const baseInputClasses = "bg-main border border-border-color rounded-lg text-text-primary px-3.5 py-2.5 font-sans text-[0.875rem] transition-all duration-150 w-full placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50";

export const Input: React.FC<InputProps> = (props) => {
  return <input className={baseInputClasses} {...props} />;
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <textarea className={`${baseInputClasses} resize-y`} {...props} />;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <div className="relative w-full">
      <select className={`${baseInputClasses} appearance-none cursor-pointer pr-10`} {...props}>
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-text-muted">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
