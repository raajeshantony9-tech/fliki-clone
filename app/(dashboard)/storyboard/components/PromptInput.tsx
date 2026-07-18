export default function PromptInput() {
  return (
    <div className="p-4">
      <textarea placeholder="Describe your video idea..." className="w-full h-32 p-2 border rounded" />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Generate Script</button>
    </div>
  );
}