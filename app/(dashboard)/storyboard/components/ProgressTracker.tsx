export default function ProgressTracker({ jobStatus, currentStep, progress }: { jobStatus: string; currentStep: string; progress: number }) {
  const steps = [
    'generateScript',
    'breakScenes',
    'createImagePrompts',
    'generateImages',
    'generateVoice',
    'generateSubtitles',
    'buildTimeline',
    'applyEffects',
    'renderVideo',
  ];
  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">Progress</h2>
      <div className="mb-2 text-sm text-gray-400">
        Status: <span className="text-white font-medium">{jobStatus}</span>
      </div>
      <div className="mb-2 text-sm text-gray-400">
        Step: <span className="text-white font-medium">{currentStep.replace(/([A-Z])/g, ' $1').trim()}</span>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="bg-blue-600 h-3 transition-width duration-500"
          ></div>
        </div>
        <div className="mt-2 text-right text-sm text-white font-mono">
          {progress}%
        </div>
        <div className="space-y-2 text-sm">
          {steps.map((step) => {
            const isActive = step === currentStep;
            const label = step.replace(/([A-Z])/g, ' $1').trim();
            const wrapperClasses = `flex items-center gap-2 ${isActive ? 'font-semibold text-white' : 'text-gray-400'}`;
            const dotClasses = `w-2 h-2 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-600'}`;
            return (
              <div key={step} className={wrapperClasses}>
                <div className={dotClasses} />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}