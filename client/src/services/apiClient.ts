import type { TimelineEvent } from '../components/TimelineView';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class APIClientError extends Error {
  public status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.name = 'APIClientError';
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = new URL(path, API_BASE_URL);
  
  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type') && !(options?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! Status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && typeof errorData.error === 'string') {
        errorMessage = errorData.error;
      }
    } catch {
      // Fallback if parsing response fails
    }
    throw new APIClientError(errorMessage, response.status);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  async fetchDemo(caseType: string): Promise<TimelineEvent[]> {
    const params = new URLSearchParams();
    params.set('case', caseType);
    
    const data = await request<{ events: TimelineEvent[] }>(`/api/demo?${params.toString()}`, {
      method: 'GET',
    });
    return data.events;
  },

  async extractTimeline(
    documents: { name: string; content: string }[],
    apiKey?: string
  ): Promise<TimelineEvent[]> {
    const data = await request<{ events: TimelineEvent[] }>('/api/extract', {
      method: 'POST',
      body: JSON.stringify({ documents, apiKey }),
    });
    return data.events;
  },
};
