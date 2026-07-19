// db/repositories/storyboardRepository.ts
import { Storyboard, Script, Scene, Timeline } from '@/types/storyboard';
import { StoryboardJob } from '@/types/job';

// In-memory stores (replace with real DB/PRISMA in production)
const storyboards = new Map<string, Storyboard>();
const scripts = new Map<string, Script>();
const scenesMap = new Map<string, Scene[]>();
const timelines = new Map<string, Timeline>();
const renderJobs = new Map<string, string>(); // storyboardId -> renderJobId

export const storyboardRepository = {
  // Storyboard CRUD
  async create(data: Omit<Storyboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Storyboard> {
    const id = crypto.randomUUID();
    const now = new Date();
    const storyboard: Storyboard = { id, ...data, createdAt: now, updatedAt: now };
    storyboards.set(id, storyboard);
    return storyboard;
  },

  async findById(id: string): Promise<Storyboard | null> {
    return storyboards.get(id) ?? null;
  },

  async update(id: string, partial: Partial<Storyboard>): Promise<Storyboard | null> {
    const existing = storyboards.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial, updatedAt: new Date() };
    storyboards.set(id, updated);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    return storyboards.delete(id);
  },

  // Script
  async saveScript(storyboardId: string, script: Script): Promise<void> {
    scripts.set(script.id, script);
    await this.update(storyboardId, { script });
  },

  async getScript(storyboardId: string): Promise<Script | null> {
    return scripts.get(storyboardId) ?? null;
  },

  async getScriptById(scriptId: string): Promise<Script | null> {
    for (const [_, script] of scripts.entries()) {
      if (script.id === scriptId) return script;
    }
    return null;
  },

  // Scenes
  async saveScenes(storyboardId: string, scenes: Scene[]): Promise<void> {
    scenesMap.set(storyboardId, scenes);
  },

  async getScenes(storyboardId: string): Promise<Scene[]> {
    return scenesMap.get(storyboardId) ?? [];
  },

  async updateScenePrompts(storyboardId: string, updates: Partial<Scene>[]): Promise<void> {
    const current = await this.getScenes(storyboardId);
    const updated = current.map(sc => {
      const up = updates.find(u => u.id === sc.id);
      return up ? { ...sc, ...up } : sc;
    });
    await this.saveScenes(storyboardId, updated);
  },

  async updateSceneImages(storyboardId: string, updates: Partial<Scene>[]): Promise<void> {
    const current = await this.getScenes(storyboardId);
    const updated = current.map(sc => {
      const up = updates.find(u => u.id === sc.id);
      const merged = { ...sc };
      if (up?.imageUrl !== undefined) merged.imageUrl = up.imageUrl;
      if (up?.imagePrompt !== undefined) merged.imagePrompt = up.imagePrompt;
      return merged;
    });
    await this.saveScenes(storyboardId, updated);
  },

  async updateSceneVoices(storyboardId: string, updates: Partial<Scene>[]): Promise<void> {
    const current = await this.getScenes(storyboardId);
    const updated = current.map(sc => {
      const up = updates.find(u => u.id === sc.id);
      const merged = { ...sc };
      if (up?.voiceUrl !== undefined) merged.voiceUrl = up.voiceUrl;
      return merged;
    });
    await this.saveScenes(storyboardId, updated);
  },

  async updateSceneSubtitles(storyboardId: string, updates: Partial<Scene>[]): Promise<void> {
    const current = await this.getScenes(storyboardId);
    const updated = current.map(sc => {
      const up = updates.find(u => u.id === sc.id);
      const merged = { ...sc };
      if (up?.subtitles !== undefined) merged.subtitles = up.subtitles;
      return merged;
    });
    await this.saveScenes(storyboardId, updated);
  },

  // Timeline
  async saveTimeline(storyboardId: string, timeline: Timeline): Promise<void> {
    timelines.set(storyboardId, timeline);
  },

  async getTimeline(storyboardId: string): Promise<Timeline | null> {
    return timelines.get(storyboardId) ?? null;
  },

  async updateTimeline(storyboardId: string, timeline: Timeline): Promise<void> {
    await this.saveTimeline(storyboardId, timeline);
  },

  // Render job tracking
  async setRenderJobId(storyboardId: string, renderJobId: string): Promise<void> {
    renderJobs.set(storyboardId, renderJobId);
  },

  async getRenderJobId(storyboardId: string): Promise<string | null> {
    return renderJobs.get(storyboardId) ?? null;
  },
};