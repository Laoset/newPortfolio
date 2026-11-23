import { describe, expect, test } from 'vitest';
import {
  MAX_CONVERSATION_MESSAGES,
  MAX_MESSAGE_LENGTH,
  RATE_LIMIT_MAX_MESSAGES,
  consumeRateLimit,
  nextChatUsage,
  sanitizeConversationId,
  validateChatMessage
} from '@/lib/chat-guard';
import { geminiErrorForLog, resolveGeminiModel } from '@/lib/gemini-log';
import { openUsage, sealUsage } from '@/lib/chat-seal';
import { consumeSharedWindow } from '@/lib/chat-upstash';
import { hasWorkingAchievements } from '@/lib/experience';
import { SITE_URL, buildRobots, buildSitemap } from '@/lib/site';
import { pendingMuvinaiProjects } from '@/content/pending-projects';

describe('chat message guard', () => {
  test('uses the current flash-lite model unless overridden', () => {
    expect(resolveGeminiModel()).toBe('gemini-3.5-flash-lite');
    expect(resolveGeminiModel('  gemini-3.5-flash-lite  ')).toBe(
      'gemini-3.5-flash-lite'
    );
    expect(resolveGeminiModel()).not.toBe('gemini-2.5-flash-lite');
  });

  test('redacts an API key from a Gemini error', () => {
    const error = Object.assign(
      new Error('bad key AIzaSyABCDEFghijklmnop123456'),
      {
        status: 404
      }
    );
    expect(geminiErrorForLog(error)).toEqual({
      status: 404,
      message: 'bad key [redacted]'
    });
  });

  test('rejects empty messages and accepts a normal one', () => {
    expect(validateChatMessage('   ').ok).toBe(false);
    expect(validateChatMessage('Hola').ok).toBe(true);
  });

  test('rejects messages over the length limit', () => {
    const result = validateChatMessage('a'.repeat(MAX_MESSAGE_LENGTH + 1));
    expect(result).toEqual({ ok: false, error: 'too_long' });
  });

  test('caps a conversation and resets that cap for a new one', () => {
    const now = 5_000;
    let usage = null;
    for (let i = 0; i < MAX_CONVERSATION_MESSAGES; i += 1) {
      const step = nextChatUsage(usage, 'conv-one', now);
      expect(step.ok).toBe(true);
      if (step.ok) usage = step.usage;
    }
    const blocked = nextChatUsage(usage, 'conv-one', now);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.reason).toBe('conversation');

    const fresh = nextChatUsage(usage, 'conv-two', now);
    expect(fresh.ok).toBe(true);
  });

  test('blocks the time window and opens it again after it expires', () => {
    const now = 5_000;
    let usage = null;
    for (let i = 0; i < RATE_LIMIT_MAX_MESSAGES; i += 1) {
      const step = nextChatUsage(usage, `conv-${i}`, now);
      expect(step.ok).toBe(true);
      if (step.ok) usage = step.usage;
    }
    const blocked = nextChatUsage(usage, 'another-conv', now);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.reason).toBe('window');

    const later = nextChatUsage(usage, 'later-conv', now + 10 * 60 * 1000 + 1);
    expect(later.ok).toBe(true);
  });

  test('rejects a tampered usage cookie', () => {
    const usage = { w: 1, c: 1, id: 'conv-one1', n: 1 };
    const token = sealUsage(usage, 'secret');
    expect(openUsage(token, 'secret')).toEqual(usage);
    expect(openUsage(`${token}x`, 'secret')).toBeNull();
    expect(openUsage(token, 'other-secret')).toBeNull();
  });

  test('ignores a shared counter when Upstash is not configured', async () => {
    await expect(
      consumeSharedWindow({
        url: undefined,
        token: undefined,
        key: 'chat:1.1.1.1',
        windowMs: 1000,
        max: 2
      })
    ).resolves.toBe('skip');
  });

  test('uses the shared counter when Upstash answers', async () => {
    const fetchImpl = (async () =>
      new Response(JSON.stringify({ result: [{ result: 3 }, { result: 1 }] }), {
        status: 200
      })) as typeof fetch;
    await expect(
      consumeSharedWindow({
        url: 'https://example.upstash.io',
        token: 'token',
        key: 'chat:1.1.1.1',
        windowMs: 1000,
        max: 2,
        fetchImpl
      })
    ).resolves.toBe('deny');
  });

  test('keeps chatting if the shared counter request fails', async () => {
    const fetchImpl = (async () => {
      throw new Error('offline');
    }) as typeof fetch;
    await expect(
      consumeSharedWindow({
        url: 'https://example.upstash.io',
        token: 'token',
        key: 'chat:1.1.1.1',
        windowMs: 1000,
        max: 2,
        fetchImpl
      })
    ).resolves.toBe('skip');
  });

  test('falls back when the conversation id is not usable', () => {
    expect(sanitizeConversationId('short')).toBe('session');
    expect(sanitizeConversationId('conv-one1')).toBe('conv-one1');
  });

  test('rate limit allows the window and blocks the next message', () => {
    const store = new Map();
    const now = 1_000;
    for (let i = 0; i < 15; i += 1) {
      expect(consumeRateLimit(store, '1.1.1.1', now)).toBe(true);
    }
    expect(consumeRateLimit(store, '1.1.1.1', now)).toBe(false);
    expect(consumeRateLimit(store, '1.1.1.1', now + 10 * 60 * 1000 + 1)).toBe(
      true
    );
  });
});

describe('experience achievements', () => {
  test('hides the list when keys are missing', () => {
    expect(hasWorkingAchievements(null)).toBe(false);
    expect(hasWorkingAchievements(undefined)).toBe(false);
    expect(hasWorkingAchievements([])).toBe(false);
    expect(hasWorkingAchievements(['Shipped a backoffice'])).toBe(true);
  });
});

describe('canonical site metadata', () => {
  test('robots and sitemap use kevincorman.com and both locales', () => {
    const robots = buildRobots();
    expect(robots.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(JSON.stringify(robots)).not.toContain('vercel.app');
    expect(JSON.stringify(robots)).not.toContain('/private');

    const urls = buildSitemap().map((entry) => entry.url);
    expect(urls).toEqual([`${SITE_URL}/en`, `${SITE_URL}/es`]);
  });
});

describe('pending Muvinai projects', () => {
  test('stay unpublished until Kevin fills the real links', () => {
    expect(pendingMuvinaiProjects.length).toBeGreaterThan(0);
    for (const project of pendingMuvinaiProjects) {
      expect(project.link).toBe('');
      expect(project.github).toBe('');
      expect(project.npm).toBe('');
      expect(project.title).toBe('');
    }
  });
});
