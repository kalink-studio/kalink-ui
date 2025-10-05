import { isObject } from '@kalink-ui/dibbly';

import type { Media } from '@/types/cms';

export interface ResolvedMedia {
  url: string;
  alt: string;
}

export const resolveMedia = (
  media: Media | string | null | undefined,
): ResolvedMedia | null => {
  if (isObject<Media>(media) && typeof media.url === 'string') {
    return {
      url: media.url,
      alt: media.alt ?? '',
    };
  }

  return null;
};
