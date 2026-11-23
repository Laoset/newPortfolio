import React from 'react';
import { vi } from 'vitest';

const MOTION_PROPS = [
  'initial',
  'animate',
  'exit',
  'transition',
  'whileInView',
  'whileHover',
  'whileTap',
  'viewport',
  'variants',
  'layout'
];

vi.mock('motion/react', () => {
  const omitMotionProps = (props: Record<string, unknown>) => {
    const rest = { ...props };
    for (const key of MOTION_PROPS) {
      delete rest[key];
    }
    return rest;
  };

  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({
          children,
          ...props
        }: {
          children?: React.ReactNode;
        } & Record<string, unknown>) =>
          React.createElement(tag, omitMotionProps(props), children)
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => children,
    useReducedMotion: () => false
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translate = (key: string) => key;
    translate.raw = (key: string) => key;
    return translate;
  },
  hasLocale: (locales: readonly string[], candidate: unknown) =>
    typeof candidate === 'string' && locales.includes(candidate)
}));

export const setScreenSize = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  window.dispatchEvent(new Event('resize'));
};
