export default function ExportButton({ storyboard, onExportStart, onExportComplete }: { storyboard: any; onExportStart: () => Promise<void>; onExportComplete: (url: string) => void }) {
  const handleClick = async () => {
    await onExportStart();
    // In a real implementation, polling would happen elsewhere.
    // For now we just call complete with a placeholder URL after a short delay.
    setTimeout(() => {
      onExportComplete('#');
    }, 1000);
  };
  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-transform transform hover:scale-105"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Export Video
    </button>
  );
}