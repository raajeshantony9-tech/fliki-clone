export default function ExportButton({ storyboard, onExportStart, onExportComplete }: { storyboard: any; onExportStart: () => Promise<void>; onExportComplete: (url: string) => void }) {
  const handleClick = async () => {
    await onExportStart();
    // In real implementation, polling would happen elsewhere; for placeholder we just call complete with a dummy url.
    // Actual implementation would use a job/polling mechanism.
    onExportComplete('#'); // placeholder
  };
  return (
    <button onClick={handleClick} className="btn btn-primary px-6 py-2">
      Export Video
    </button>
  );
}