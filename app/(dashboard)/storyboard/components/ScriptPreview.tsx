export default function ScriptPreview({ script }: { script: string }) {
  return (
    <div className="p-4 border">
      <h2 className="font-semibold mb-2">Script</h2>
      <p className="whitespace-pre-wrap">{script}</p>
    </div>
  );
}