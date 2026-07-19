import SceneCard from './SceneCard';

export default function SceneList({ scenes, onReplace }: { scenes: any[]; onReplace: () => void }) {
  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">Scenes</h2>
      <div className="space-y-4">
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            onSelect={() => onReplace()}
            onEdit={() => {}}
            onRemove={() => {}}
            onRegenerateImage={() => {}}
            onRegenerateVoice={() => {}}
          />
        ))}
      </div>
    </div>
  );
}