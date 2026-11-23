export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getThemeSnapshot(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light'
    ? 'light'
    : 'dark';
}

export function getServerThemeSnapshot(): Theme {
  return 'dark';
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function setStoredTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
  notify();
}

export function toggleStoredTheme() {
  setStoredTheme(getThemeSnapshot() === 'light' ? 'dark' : 'light');
}
