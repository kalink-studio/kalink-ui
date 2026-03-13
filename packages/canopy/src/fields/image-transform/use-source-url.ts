'use client';

import { useEffect, useState } from 'react';

import { getRelationID, unwrapRelationValue } from './relation-utils.js';

import type { ImageTransformRelationValue } from './types.js';

export const useSourceUrl = (
  sourceValue: ImageTransformRelationValue | undefined,
  relationTo: string | undefined,
  apiUrl: string,
): string | undefined => {
  const [fetchedUrl, setFetchedUrl] = useState<string | undefined>(undefined);
  const resolved = unwrapRelationValue(sourceValue);
  const resolvedUrl = resolved?.url ?? undefined;
  const sourceID = getRelationID(sourceValue);

  useEffect(() => {
    if (resolvedUrl) {
      setFetchedUrl(undefined);

      return;
    }

    if (!sourceID || !relationTo) {
      setFetchedUrl(undefined);

      return;
    }

    let cancelled = false;

    const fetchSource = async () => {
      try {
        const response = await fetch(`${apiUrl}/${relationTo}/${sourceID}`, {
          credentials: 'include',
        });

        if (!response.ok || cancelled) {
          return;
        }

        const data = (await response.json()) as { url?: string };

        if (!cancelled && data.url) {
          setFetchedUrl(data.url);
        }
      } catch {
        // Silently fail; preview just won't show.
      }
    };

    void fetchSource();

    return () => {
      cancelled = true;
    };
  }, [apiUrl, relationTo, resolvedUrl, sourceID]);

  return resolvedUrl ?? fetchedUrl;
};
