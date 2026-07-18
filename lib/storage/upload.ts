// lib/storage/upload.ts
/**
 * Abstract storage upload interface.
 * In a real app this would plug into S3, GCS, Cloudinary, etc.
 */
export interface StorageProvider {
  upload(file: Buffer | Blob | string, key: string): Promise<string>; // returns public URL or path
  getSignedUrl(key: string, expiresInSeconds: number): Promise<string>;
}

/**
 * Default in‑memory storage for development (returns placeholder URLs).
 */
export class MemoryStorage implements StorageProvider {
  private store = new Map<string, string>();

  async upload(file: Blob | Buffer | string, key: string): Promise<string> {
    // In dev we just return a placeholder URL.
    // Real implementation would store the file and return a CDN URL.
    this.store.set(key, typeof file === 'string' ? file : '');
    return `https://example.com/storage/${encodeURIComponent(key)}`;
  }

  async getSignedUrl(key: string, expiresInSeconds: number = 3600): Promise<string> {
    // For simplicity return same URL; in prod generate a time‑limited signed URL.
    return `https://example.com/storage/${encodeURIComponent(key)}?expires=${Date.now() + expiresInSeconds * 1000}`;
  }
}

// Export a singleton instance for use throughout the app.
export const storage = new MemoryStorage();

/**
 * Helper function to upload a file and return its URL.
 */
export async function upload(file: Blob | Buffer | string, key: string): Promise<string> {
  return storage.upload(file, key);
}