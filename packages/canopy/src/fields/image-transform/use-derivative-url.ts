'use client';

import { useEffect, useState } from 'react';

import { getRelationID, unwrapRelationValue } from './relation-utils';

import type { ImageTransformRelationValue } from './types';

export const useDerivativeUrl = (
  derivative: ImageTransformRelationValue | undefined,
  derivativeCollectionSlug: string | undefined,
  apiUrl: string,
): string | undefined => {
  const [fetchedUrl, setFetchedUrl] = useState<string | undefined>(undefined);
  const resolved = unwrapRelationValue(derivative);
  const resolvedUrl = resolved?.url ?? undefined;
  const derivativeID = getRelationID(derivative);

  useEffect(() => {
    if (resolvedUrl) {
      setFetchedUrl(undefined);

      return;
    }

    if (!derivativeID || !derivativeCollectionSlug) {
      setFetchedUrl(undefined);

      return;
    }

    let cancelled = false;

    const fetchDerivative = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/${derivativeCollectionSlug}/${derivativeID}`,
          {
            credentials: 'include',
          },
        );

        if (!response.ok || cancelled) {
          return;
        }

        const data = (await response.json()) as { url?: string };

        if (!cancelled && data.url) {
          setFetchedUrl(data.url);
        }
      } catch {
        // Silently fail; thumbnail just won't show.
      }
    };

    void fetchDerivative();

    return () => {
      cancelled = true;
    };
  }, [apiUrl, derivativeCollectionSlug, derivativeID, resolvedUrl]);

  return resolvedUrl ?? fetchedUrl;
};
