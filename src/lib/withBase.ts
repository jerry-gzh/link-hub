import { BASE_PATH } from '../config/deployment';

/** Prefixes a public asset path with the Astro deployment base. */
export function withBase(path: string, base = BASE_PATH): string {
  const normalizedBase = base === '/' ? '' : base.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');

  return `${normalizedBase}/${normalizedPath}`;
}
