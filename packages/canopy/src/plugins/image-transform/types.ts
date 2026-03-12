import type {
  ImageTransformCrop,
  ImageTransformFieldValue,
  ImageTransformPresetDefinition,
  ImageTransformRelationValue,
} from '../../fields/image-transform';
import type { CollectionConfig, CollectionSlug } from 'payload';

export const DEFAULT_IMAGE_TRANSFORM_ENDPOINT_PATH = '/image-transform';

export type ImageTransformOwnerKind = 'collection' | 'global';
export type ImageTransformAction = 'clear' | 'generate';

export interface ImageTransformPluginOptions {
  readonly defaultSourceRelationTo?: CollectionSlug | string;
  readonly derivativeCollectionSlug: CollectionSlug | string;
  readonly endpointPath?: string;
}

export interface CreateImageTransformDerivativeCollectionOptions extends Partial<
  Omit<CollectionConfig, 'fields' | 'slug' | 'upload'>
> {
  readonly slug?: CollectionSlug | string;
  readonly sourceRelationTo?: CollectionSlug | string;
  readonly upload?: CollectionConfig['upload'];
}

export interface ImageTransformDerivativeMetadata {
  readonly fieldPath: string;
  readonly fingerprint: string;
  readonly ownerID?: string;
  readonly ownerKind: ImageTransformOwnerKind;
  readonly ownerSlug: string;
  readonly presetAspectRatio: string;
  readonly presetKey: string;
  readonly source: ImageTransformRelationValue;
  readonly sourceCollection: string;
  readonly sourceID: string;
  readonly sourceVersion?: string;
  readonly usagePath: string;
}

export interface ImageTransformOwnerContext {
  readonly dataPath: string;
  readonly fieldPath: string;
  readonly ownerID?: string;
  readonly ownerKind: ImageTransformOwnerKind;
  readonly ownerSlug: string;
  readonly presetByKey: ReadonlyMap<string, ImageTransformPresetDefinition>;
  readonly presets: readonly ImageTransformPresetDefinition[];
  readonly relationTo: CollectionSlug | string;
  readonly usagePath: string;
  readonly value: ImageTransformFieldValue;
}

export interface ImageTransformGenerateRequest {
  readonly action?: ImageTransformAction;
  readonly collectionSlug?: CollectionSlug | string;
  readonly dataPath?: string;
  readonly fieldValue?: ImageTransformFieldValue;
  readonly fieldPath?: string;
  readonly globalSlug?: string;
  readonly id?: number | string;
  readonly presetKeys?: readonly string[];
  readonly schemaPath?: string;
}

export interface ImageTransformGenerationResult {
  readonly doc: Record<string, unknown>;
  readonly errors: Record<string, string>;
  readonly generatedPresetKeys: readonly string[];
  readonly value: ImageTransformFieldValue;
}

export interface ImageTransformGenerationTarget {
  readonly crop: ImageTransformCrop;
  readonly derivative: ImageTransformRelationValue;
  readonly fieldPath: string;
  readonly fingerprint: string;
  readonly ownerID?: string;
  readonly ownerKind: ImageTransformOwnerKind;
  readonly ownerSlug: string;
  readonly preset: ImageTransformPresetDefinition;
  readonly relationTo: CollectionSlug | string;
  readonly source: ImageTransformRelationValue;
  readonly usagePath: string;
}
