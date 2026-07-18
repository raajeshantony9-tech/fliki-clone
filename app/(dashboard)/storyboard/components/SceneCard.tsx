export default function SceneCard({ scene, onEdit, onRemove, onRegenerateImage }: { scene: any; onEdit: () => void; onRemove: () => void; onRegenerateImage: () => void }) {
  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h3 className="font-medium">Scene {scene.order + 1}</h3>
      <p>{scene.description}</p>
      {scene.imageUrl && (
        <div className="mt-2">
          <img src={scene.imageUrl} alt="scene" className="max-w-xs rounded" />
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button onClick={onEdit} className="btn btn-sm btn-primary">Edit</button>
        <button onClick={onRemove} className="btn btn-sm btn-destructive">Remove</button>
        <button onClick={onRegenerateImage} className="btn btn-sm btn-secondary">Regenerate Image</button>
      </div>
    </div>
  );
}