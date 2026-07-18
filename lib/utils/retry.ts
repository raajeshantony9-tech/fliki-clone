// lib/utils/retry.ts
/**
 * Retry an asynchronous function with exponential backoff.
 * @param fn - Async function to retry.
 * @param options - Configuration: retries (number), minDelay (ms), maxDelay (ms), factor (multiplier).
 * @returns Promise resolving to the result of fn.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    minDelay?: number;
    maxDelay?: number;
    factor?: number;
  } = {}
): Promise<T> {
  const {
    retries = 3,
    minDelay = 100,
    maxDelay = 5000,
    factor = 2,
  } = options;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt > retries) throw err;
      const delay = Math.min(minDelay * Math.pow(factor, attempt - 1), maxDelay);
      // Jitter to avoid thundering herd
      const jitter = Math.random() * 0.1 * delay;
      await new Promise(res => setTimeout(res, delay + jitter));
    }
  }
}