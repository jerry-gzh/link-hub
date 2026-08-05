import { describe, expect, it } from 'vitest';

import data from '../../OpenLinks.json';
import vercelConfig from '../../vercel.json';
import { BASE_PATH, CANONICAL_URL, SITE_URL } from '../config/deployment';

describe('links deployment', () => {
  it('publishes under the canonical links path', () => {
    expect(SITE_URL).toBe('https://gerardoguzmanh.com');
    expect(BASE_PATH).toBe('/links');
    expect(CANONICAL_URL).toBe('https://gerardoguzmanh.com/links/');
    expect(data.url_base).toBe(CANONICAL_URL);
  });

  it('maps public links requests to the static artifact root', () => {
    expect(vercelConfig.rewrites).toEqual([
      { source: '/links', destination: '/' },
      { source: '/links/', destination: '/' },
      { source: '/links/:path*', destination: '/:path*' },
    ]);
  });
});
