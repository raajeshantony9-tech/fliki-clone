export default function SceneList({ scenes, onReorder }: { scenes: any[]; onReorder: (from: number, to: number) => void }) {
  return (
    <div className="p-4 space-y-2">
      <h2 className="font-semibold mb-2">Scenes</h2>
      <div className="border rounded p-2 min-h-[200px]">
        {scenes.map((scene, idx) => (
          <div key={scene.id} className="p-2 mb-2 border rounded bg-gray-50">
            <strong>Scene {idx + 1}:</strong> {scene.description}
          </div>
        ))}
      </div>
    </div>
  );
}