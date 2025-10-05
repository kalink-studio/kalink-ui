import type { AnchorFields } from '@/types/cms';

import { slugify } from './slugify';

export const getAnchorId = (
  candidate: AnchorFields & { showInSubNavigation?: boolean },
  fallback?: string,
) => {
  if (!candidate.showInSubNavigation) {
    return undefined;
  }

  if (candidate.anchorSlug && candidate.anchorSlug.trim().length > 0) {
    return candidate.anchorSlug;
  }

  const label = candidate.subNavigationLabel || fallback;

  if (!label) {
    return undefined;
  }

  return slugify(label);
};
