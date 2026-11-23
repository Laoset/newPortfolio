export const MAX_MESSAGE_LENGTH = 1000;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const RATE_LIMIT_MAX_MESSAGES = 15;

export type RateRecord = {
  count: number;
  lastReset: number;
};

export function validateChatMessage(
  message: unknown
): { ok: true; value: string } | { ok: false; error: 'required' | 'too_long' } {
  if (typeof message !== 'string' || message.trim().length === 0) {
    return { ok: false, error: 'required' };
  }

  const value = message.trim();
  if (value.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: 'too_long' };
  }

  return { ok: true, value };
}

/**
 * In-memory window. This does not survive across serverless isolates;
 * see the comment in the chatbot route.
 * Returns true when the request is allowed.
 */
export function consumeRateLimit(
  store: Map<string, RateRecord>,
  ip: string,
  now: number
) {
  const current = store.get(ip);

  if (!current || now - current.lastReset > RATE_LIMIT_WINDOW_MS) {
    store.set(ip, { count: 1, lastReset: now });
    return true;
  }

  current.count += 1;
  return current.count <= RATE_LIMIT_MAX_MESSAGES;
}
