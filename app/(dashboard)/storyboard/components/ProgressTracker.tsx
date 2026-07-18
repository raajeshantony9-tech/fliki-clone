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
    <div className="p-4 bg-gray-50 rounded border">
      <h2 className="font-semibold mb-2">Progress</h2>
      <div className="mb-2">Status: {jobStatus}</div>
      <div className="mb-2">Current step: {currentStep}</div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded h-2.5 overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="bg-blue-600 h-2.5 transition-width duration-500"
          ></div>
        </div>
        <span className="block text-right text-sm">{progress}%</span>
      </div>
      <ol className="list-decimal pl-5 space-y-1 text-sm">
        {steps.map((step, idx) => (
          <li key={step} className={step === currentStep ? 'font-semibold' : ''}>
            {step.replace(/([A-Z])/g, ' $1').trim()}
          </li>
        ))}
      </ol>
    </div>
  );
}