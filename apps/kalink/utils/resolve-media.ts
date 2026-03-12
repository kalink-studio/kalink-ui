import { resolveImageTransformPreset } from '@kalink-ui/canopy';
import { isObject } from '@kalink-ui/dibbly';

import type { Media } from '@/types/cms';

import type { ImageTransformFieldValue } from '@kalink-ui/canopy';

export interface ResolvedMedia {
  url: string;
  alt: string;
}

export const resolveMedia = (
  media: ImageTransformFieldValue | Media | string | null | undefined,
  presetKey?: string,
): ResolvedMedia | null => {
  if (
    isObject<ImageTransformFieldValue>(media) &&
    ('source' in media || 'presets' in media)
  ) {
    const resolved = presetKey
      ? resolveImageTransformPreset(media, presetKey)
      : null;
    const source = isObject<Media>(media.source) ? media.source : null;

    if (resolved && typeof resolved.url === 'string') {
      return {
        alt:
          typeof resolved.alt === 'string' ? resolved.alt : (source?.alt ?? ''),
        url: resolved.url,
      };
    }

    if (source && typeof source.url === 'string') {
      return {
        alt: source.alt ?? '',
        url: source.url,
      };
    }

    return null;
  }

  if (isObject<Media>(media) && typeof media.url === 'string') {
    return {
      url: media.url,
      alt: media.alt ?? '',
    };
  }

  return null;
};
