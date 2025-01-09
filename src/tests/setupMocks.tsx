import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<{}>) => (
      <div {...props}>{children}</div>
    ),
    ul: ({ children, ...props }: React.PropsWithChildren<{}>) => (
      <ul {...props}>{children}</ul>
    )
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<{}>) => (
    <>{children}</>
  )
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));
// Function to change screen size
export const setScreenSize = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  window.dispatchEvent(new Event('resize'));
};
