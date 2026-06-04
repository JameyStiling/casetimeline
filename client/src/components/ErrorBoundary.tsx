import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled active runtime error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-main text-text-primary font-sans p-8 text-center">
          <div className="text-[3rem] mb-4">⚠️</div>
          <h1 className="font-display text-[1.75rem] font-bold mb-2 bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            Something went wrong in the Case Timeline Builder
          </h1>
          <p className="text-text-secondary text-[0.95rem] max-w-[500px] leading-relaxed mb-6">
            An unexpected error occurred during rendering. You can try refreshing the page or clearing your local cache.
          </p>
          {this.state.error && (
            <pre className="bg-card border border-border-color rounded-lg p-4 text-[0.8rem] text-red-500 max-w-[600px] overflow-x-auto text-left mb-8 font-mono">
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-1.5 font-sans text-[0.875rem] font-semibold rounded-lg border-none cursor-pointer transition-all duration-150 bg-brand-primary text-white hover:bg-brand-primary-hover py-2.5 px-6 active:scale-[0.98] shadow-md shadow-brand-primary/10"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
