export async function consumeSharedWindow(options: {
  url: string | undefined;
  token: string | undefined;
  key: string;
  windowMs: number;
  max: number;
  fetchImpl?: typeof fetch;
}): Promise<'allow' | 'deny' | 'skip'> {
  const { url, token, key, windowMs, max } = options;
  if (!url || !token) return 'skip';

  const fetchImpl = options.fetchImpl ?? fetch;

  try {
    const response = await fetchImpl(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['INCR', key],
        ['PEXPIRE', key, windowMs, 'NX']
      ])
    });

    if (!response.ok) return 'skip';

    const payload = (await response.json()) as {
      result?: { result?: unknown }[];
    };
    const count = payload.result?.[0]?.result;
    if (typeof count !== 'number') return 'skip';
    return count > max ? 'deny' : 'allow';
  } catch {
    return 'skip';
  }
}
