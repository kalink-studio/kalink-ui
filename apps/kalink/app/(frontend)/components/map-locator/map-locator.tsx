'use client';

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { ForwardedRef, forwardRef } from 'react';

import { vars } from '@/styles/contract.css';

export interface MapLocatorProps {
  apiKey?: string;
  mapId?: string;
  latitude?: number;
  longitude?: number;
}

const MapLocatorBase = (
  {
    apiKey,
    mapId,
    latitude = 46.51401398768072,
    longitude = 6.842526934453779,
  }: MapLocatorProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  if (!apiKey || !mapId) {
    return null;
  }

  const position = { lat: latitude, lng: longitude } as const;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 320,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={14}
          mapId={mapId}
          defaultCenter={position}
          disableDefaultUI
        >
          <AdvancedMarker position={position}>
            <Pin
              background={vars.system.color.primary}
              glyphColor={vars.system.color.onPrimary}
              borderColor={vars.system.color.onPrimary}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export const MapLocator = forwardRef(MapLocatorBase);
