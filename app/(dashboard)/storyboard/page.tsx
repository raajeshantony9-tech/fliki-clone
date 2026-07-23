'use client';

import { useState, useEffect } from 'react';
import PromptInput from './components/PromptInput';
import ScriptPreview from './components/ScriptPreview';
import SceneList from './components/SceneList';
import TimelineEditor from './components/TimelineEditor';
import ExportButton from './components/ExportButton';
import ProgressTracker from './components/ProgressTracker';
import { storyboardApi } from './lib/storyboardApi';
import type { Storyboard } from '@/types/storyboard';

export default function StoryboardPage() {
  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [jobStatus, setJobStatus] = useState<'idle' | 'queued' | 'processing' | 'completed' | 'failed'>('idle');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [jobId, setJobId] = useState<string | null>(null);

  // Placeholder hooks – actual implementation will use useStoryboard hook
  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;
    setJobStatus('queued');

    try {
      // Create storyboard draft via API
      const storyboardData = await storyboardApi.createDraft(prompt);
      setStoryboard(storyboardData);

      // Start generation process
      const { jobId } = await storyboardApi.startGeneration(storyboardData.id);
      setJobId(jobId);
      setJobStatus('processing');
      setCurrentStep('generateScript');
      setProgress(10);
    } catch (error) {
      console.error('Failed to create storyboard:', error);
      setJobStatus('failed');
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (jobId && storyboard) {
      intervalId = setInterval(async () => {
        try {
          const jobStatusData = await storyboardApi.getJobStatus(storyboard.id, jobId);
          setJobStatus(jobStatusData.status);
          setCurrentStep(jobStatusData.currentStep);
          setProgress(jobStatusData.progress);

          if (jobStatusData.status === 'completed' || jobStatusData.status === 'failed') {
            if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
            }
            setJobId(null); // reset to stop the effect from re-running
          }
        } catch (error) {
          console.error('Failed to fetch job status:', error);
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
          setJobStatus('failed');
          setJobId(null);
        }
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [jobId, storyboard]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-8">
      <div className="mx-auto max-w-4xl bg-gray-800 rounded-xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-center text-white">Create a Storyboard</h1>
        <PromptInput onSubmit={handleGenerate} />
        {storyboard && (
          <>
            <ScriptPreview script={storyboard.script ?? { id: 'temp', rawText: 'No script yet', createdAt: new Date() }} />
            <div className="grid gap-6 md:grid-cols-2">
              <SceneList scenes={storyboard.scenes} onReplace={() => {}} />
              <TimelineEditor
                timeline={{ tracks: [], transitions: [] }}
                onTimelineChange={() => {}}
              />
            </div>
            <ProgressTracker
              jobStatus={jobStatus}
              currentStep={currentStep}
              progress={progress}
            />
            <ExportButton
              storyboard={storyboard}
              onExportStart={() => Promise.resolve()}
              onExportComplete={(url) => alert('Download: ' + url)}
            />
          </>
        )}
      </div>
    </div>
  );
}