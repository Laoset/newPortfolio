const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';

export function resolveGeminiModel(override?: string) {
  const value = override?.trim();
  return value || DEFAULT_GEMINI_MODEL;
}

export function geminiErrorForLog(error: unknown) {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? (error as { status?: unknown }).status
      : undefined;
  const raw = error instanceof Error ? error.message : 'Unknown Gemini error';
  const message = raw.replace(/AIza[0-9A-Za-z_-]{10,}/g, '[redacted]');
  return { status, message };
}
