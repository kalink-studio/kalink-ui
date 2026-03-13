import type { CollectionSlug } from 'payload';

export const IMAGE_TRANSFORM_FIELD_CUSTOM_KEY = 'imageTransform';
export const IMAGE_TRANSFORM_PENDING_DERIVATIVE_RELATION =
  '__imageTransformDerivativeRelation__';
export const IMAGE_TRANSFORM_PENDING_SOURCE_RELATION =
  '__imageTransformSourceRelation__';

export type ImageTransformState =
  | 'unsaved'
  | 'missing'
  | 'ready'
  | 'stale'
  | 'generating'
  | 'failed';

export interface ImageTransformCrop {
  readonly x: number;
  readonly y: number;
  readonly zoom: number;
}

export interface ImageTransformPresetDefinition {
  readonly key: string;
  readonly aspectRatio: string;
  readonly label?: string;
}

export type ImageTransformRelationValue =
  | null
  | number
  | string
  | {
      readonly _id?: number | string | null;
      readonly alt?: null | string;
      readonly filename?: null | string;
      readonly filesize?: null | number;
      readonly height?: null | number;
      readonly id?: number | string | null;
      readonly mimeType?: null | string;
      readonly updatedAt?: null | string;
      readonly url?: null | string;
      readonly width?: null | number;
      readonly [key: string]: unknown;
    }
  | {
      readonly relationTo?: string;
      readonly value?: ImageTransformRelationValue;
      readonly [key: string]: unknown;
    };

export interface ImageTransformPresetValue {
  readonly crop?: ImageTransformCrop;
  readonly derivative?: ImageTransformRelationValue;
  readonly fingerprint?: string;
  readonly lastError?: string;
  readonly lastGeneratedAt?: string;
  readonly sourceVersion?: string;
  readonly state?: ImageTransformState;
}

export interface ImageTransformFieldValue {
  readonly presets?: Record<
    string,
    ImageTransformPresetValue | undefined
  > | null;
  readonly source?: ImageTransformRelationValue;
}

export interface CreateImageTransformFieldOptions {
  readonly dbName?: string;
  readonly label?: string;
  readonly name?: string;
  readonly presets: ImageTransformPresetDefinition[];
  readonly relationTo?: CollectionSlug | string;
  readonly required?: boolean;
}

export interface ImageTransformAdminCustom {
  readonly presets: readonly ImageTransformPresetDefinition[];
  readonly relationTo?: CollectionSlug | string;
  readonly required?: boolean;
}

export interface ImageTransformFieldCustom extends ImageTransformAdminCustom {
  readonly derivativeCollectionSlug?: CollectionSlug | string;
}

export interface ImageTransformResolvedAsset {
  readonly _id?: number | string | null;
  readonly alt?: null | string;
  readonly filename?: null | string;
  readonly filesize?: null | number;
  readonly height?: null | number;
  readonly id?: number | string | null;
  readonly mimeType?: null | string;
  readonly updatedAt?: null | string;
  readonly url?: null | string;
  readonly width?: null | number;
  readonly [key: string]: unknown;
}

/** Shape returned by the image-transform endpoint on HTTP 200. */
export interface GenerationResult {
  readonly doc: Record<string, unknown>;
  readonly errors: Record<string, string>;
  readonly generatedPresetKeys: readonly string[];
  readonly value: ImageTransformFieldValue;
}
