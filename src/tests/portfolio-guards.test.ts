import { describe, expect, test } from 'vitest';
import {
  MAX_MESSAGE_LENGTH,
  consumeRateLimit,
  validateChatMessage
} from '@/lib/chat-guard';
import { hasWorkingAchievements } from '@/lib/experience';
import { SITE_URL, buildRobots, buildSitemap } from '@/lib/site';
import { pendingMuvinaiProjects } from '@/content/pending-projects';

describe('chat message guard', () => {
  test('rejects empty messages and accepts a normal one', () => {
    expect(validateChatMessage('   ').ok).toBe(false);
    expect(validateChatMessage('Hola').ok).toBe(true);
  });

  test('rejects messages over the length limit', () => {
    const result = validateChatMessage('a'.repeat(MAX_MESSAGE_LENGTH + 1));
    expect(result).toEqual({ ok: false, error: 'too_long' });
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
