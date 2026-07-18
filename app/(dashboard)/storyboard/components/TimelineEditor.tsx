export default function TimelineEditor({ timeline, onTimelineChange }: { timeline: any; onTimelineChange: (timeline: any) => void }) {
  return (
    <div className="p-4 bg-gray-50 rounded border">
      <h2 className="font-semibold mb-2">Timeline Editor</h2>
      <p className="text-gray-500">TODO: Implement drag‑and‑drop timeline with tracks for images, audio, subtitles, transitions, and effects.</p>
      {/* Placeholder visualization */}
      <div className="mt-4 p-2 border rounded min-h-[200px] bg-white">
        Timeline will appear here.
      </div>
    </div>
  );
}