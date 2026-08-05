import { describe, expect, it } from 'vitest';

import { withBase } from './withBase';

describe('withBase', () => {
  it('mounts public assets below the links base path', () => {
    expect(withBase('/icons/Web.svg', '/links')).toBe('/links/icons/Web.svg');
    expect(withBase('avatar/Avatar.webp', '/links/')).toBe('/links/avatar/Avatar.webp');
  });

  it('keeps root deployments free of duplicate slashes', () => {
    expect(withBase('/favicon/favicon.svg', '/')).toBe('/favicon/favicon.svg');
  });
});
