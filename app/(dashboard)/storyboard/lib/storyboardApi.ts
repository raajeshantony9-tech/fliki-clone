// storyboardApi.ts - Thin wrapper around /api/storyboard endpoints
export const storyboardApi = {
  /** Create a new storyboard draft */
  createDraft: async (prompt: string) => {
    const res = await fetch('/api/storyboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error('Failed to create storyboard');
    return res.json();
  },

  /** Fetch a storyboard by ID */
  getById: async (id: string) => {
    const res = await fetch(`/api/storyboard/${id}`);
    if (!res.ok) throw new Error('Failed to fetch storyboard');
    return res.json();
  },

  /** Update storyboard fields */
  update: async (id: string, data: Partial<any>) => {
    const res = await fetch(`/api/storyboard/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update storyboard');
    return res.json();
  },

  /** Start generation pipeline */
  startGeneration: async (id: string) => {
    const res = await fetch(`/api/storyboard/${id}/generate`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to start generation');
    return res.json();
  },

  /** Poll job status */
  getJobStatus: async (id: string, jobId: string) => {
    const res = await fetch(`/api/storyboard/${id}/job/${jobId}`);
    if (!res.ok) throw new Error('Failed to get job status');
    return res.json();
  },

  /** Cancel a job */
  cancelJob: async (id: string, jobId: string) => {
    const res = await fetch(`/api/storyboard/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ jobId }),
    });
    if (!res.ok) throw new Error('Failed to cancel job');
    return res.json();
  },

  /** Export video */
  exportVideo: async (id: string) => {
    const res = await fetch(`/api/storyboard/${id}/export`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to export video');
    return res.json();
  },
};