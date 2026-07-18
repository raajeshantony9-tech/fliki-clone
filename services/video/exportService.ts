/**
 * Service for finalizing a rendered video: moving it to permanent storage/CDN and cleaning up temp files.
 */
export class ExportService {
  /**
   * Finalize a render job and make the video available for download.
   * @param renderJobId - Identifier returned by the rendering service.
   * @returns Promise resolving to a public/signed URL of the final MP4.
   */
  static async finalize(renderJobId: string): Promise<string> {
    // TODO: Poll the render job, fetch output, upload to storage bucket, return URL.
    // Placeholder: return a static URL.
    return 'https://example.com/final-video.mp4';
  }
}