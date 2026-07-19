export default function TimelineEditor({ timeline, onTimelineChange }: { timeline: any; onTimelineChange: (timeline: any) => void }) {
  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">Timeline Editor</h2>
      <div className="min-h-[300px] bg-gray-700 rounded-lg dashed border-2 border-dashed border-gray-600 flex items-center justify-center text-white italic">
        Drag & drop timeline editor will go here
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Tip: Arrange scenes, add transitions, adjust timing and audio levels
      </div>
    </div>
  );
}