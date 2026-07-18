// lib/utils/uuid.ts
/**
 * Simple wrapper for generating UUIDs.
 * Uses the built‑in crypto.randomUUID when available (modern browsers/node),
 * otherwise falls back to a basic random string.
 */
export function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: not cryptographically strong but fine for placeholder.
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}