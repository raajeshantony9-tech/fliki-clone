// db/repositories/jobRepository.ts
// In-memory placeholder for storyboard jobs.
import { StoryboardJob } from '@/types/job';

const jobs = new Map<string, StoryboardJob>();

export const jobRepository = {
  async create(data: Omit<StoryboardJob, 'id' | 'createdAt' | 'updatedAt'>): Promise<StoryboardJob> {
    const id = crypto.randomUUID();
    const now = new Date();
    const job: StoryboardJob = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    jobs.set(id, job);
    return job;
  },

  async findById(id: string): Promise<StoryboardJob | null> {
    return jobs.get(id) ?? null;
  },

  async findByStoryboardId(storyboardId: string): Promise<StoryboardJob[]> {
    return Array.from(jobs.values()).filter(j => j.storyboardId === storyboardId);
  },

  async update(id: string, partial: Partial<StoryboardJob>): Promise<StoryboardJob | null> {
    const existing = jobs.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial, updatedAt: new Date() };
    jobs.set(id, updated);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    return jobs.delete(id);
  },

  // For worker to update progress and step
  async updateProgress(id: string, currentStep: StoryboardJob['currentStep'], progress: number): Promise<StoryboardJob | null> {
    return this.update(id, { currentStep, progress });
  },

  async setCompleted(id: string): Promise<StoryboardJob | null> {
    return this.update(id, { status: 'completed', progress: 100, finishedAt: new Date() });
  },

  async setFailed(id: string, error: string): Promise<StoryboardJob | null> {
    return this.update(id, { status: 'failed', error, finishedAt: new Date() });
  },

  async setCancelled(id: string): Promise<StoryboardJob | null> {
    return this.update(id, { status: 'cancelled', finishedAt: new Date() });
  },
};