import { createHmac, timingSafeEqual } from 'node:crypto';
import type { ChatUsage } from '@/lib/chat-guard';

function sign(body: string, secret: string) {
  return createHmac('sha256', secret).update(body).digest('base64url');
}

export function sealUsage(usage: ChatUsage, secret: string) {
  const body = Buffer.from(JSON.stringify(usage)).toString('base64url');
  return `${body}.${sign(body, secret)}`;
}

export function openUsage(token: string, secret: string): ChatUsage | null {
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const expected = sign(body, secret);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8')
    ) as Partial<ChatUsage>;
    if (
      typeof parsed.w !== 'number' ||
      typeof parsed.c !== 'number' ||
      typeof parsed.n !== 'number' ||
      typeof parsed.id !== 'string'
    ) {
      return null;
    }
    return { w: parsed.w, c: parsed.c, n: parsed.n, id: parsed.id };
  } catch {
    return null;
  }
}
