import { useState, useCallback } from 'react';
import { Timeline, TimelineTrack, Transition } from '@/types/storyboard';

/**
 * Hook to manage timeline state for a storyboard.
 * Provides add/remove tracks, update timings, apply transitions, etc.
 */
export function useTimeline(initial: Timeline | null = null) {
  const [timeline, setTimeline] = useState<Timeline>(() => ({
    id: '',
    storyboardId: '',
    tracks: [],
    transitions: [],
    totalDuration: 0,
    ...(initial ?? {}),
  }));

  const addTrack = useCallback((track: Omit<TimelineTrack, 'id'>) => {
    setTimeline(prev => ({
      ...prev,
      tracks: [...prev.tracks, { ...track, id: crypto.randomUUID() }],
    }));
  }, []);

  const removeTrack = useCallback((id: string) => {
    setTimeline(prev => ({
      ...prev,
      tracks: prev.tracks.filter(t => t.id !== id),
    }));
  }, []);

  const updateTrack = useCallback((id: string, updates: Partial<TimelineTrack>) => {
    setTimeline(prev => ({
      ...prev,
      tracks: prev.tracks.map(t => (t.id === id ? { ...t, ...updates } : t)),
    }));
  }, []);

  const addTransition = useCallback((trans: Omit<Transition, 'id'>) => {
    setTimeline(prev => ({
      ...prev,
      transitions: [...prev.transitions, { ...trans, id: crypto.randomUUID() }],
    }));
  }, []);

  const clear = useCallback(() => {
    setTimeline({
      id: '',
      storyboardId: '',
      tracks: [],
      transitions: [],
      totalDuration: 0,
    });
  }, []);

  return {
    timeline,
    setTimeline,
    addTrack,
    removeTrack,
    updateTrack,
    addTransition,
    clear,
  };
}