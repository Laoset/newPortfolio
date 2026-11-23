export const MAX_MESSAGE_LENGTH = 1000;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const RATE_LIMIT_MAX_MESSAGES = 15;
export const MAX_CONVERSATION_MESSAGES = 8;

export type ChatUsage = {
  w: number;
  c: number;
  id: string;
  n: number;
};

export function nextChatUsage(
  prev: ChatUsage | null,
  conversationId: string,
  now: number
):
  | { ok: true; usage: ChatUsage }
  | { ok: false; reason: 'window' | 'conversation'; usage: ChatUsage } {
  const id = conversationId || 'session';
  const windowOpen = prev !== null && now - prev.w <= RATE_LIMIT_WINDOW_MS;
  const w = windowOpen ? prev.w : now;
  const c = windowOpen ? prev.c : 0;
  const n = prev && prev.id === id ? prev.n : 0;
  const usage = { w, c, id, n };

  if (n >= MAX_CONVERSATION_MESSAGES) {
    return { ok: false, reason: 'conversation', usage };
  }
  if (c >= RATE_LIMIT_MAX_MESSAGES) {
    return { ok: false, reason: 'window', usage };
  }

  return { ok: true, usage: { w, c: c + 1, id, n: n + 1 } };
}

export function sanitizeConversationId(value: unknown) {
  if (typeof value !== 'string') return 'session';
  return /^[a-zA-Z0-9_-]{8,64}$/.test(value) ? value : 'session';
}

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
