import { IMAGE_TRANSFORM_PENDING_SOURCE_RELATION } from '../../fields/image-transform/types.js';

import type { CreateImageTransformDerivativeCollectionOptions } from './types.js';
import type { CollectionConfig, RelationshipField, SelectField } from 'payload';

const readonlyTextField = (name: string, label: string) => ({
  name,
  label,
  type: 'text' as const,
  admin: {
    readOnly: true,
  },
});

const ownerKindField: SelectField = {
  name: 'ownerKind',
  label: 'Owner type',
  type: 'select',
  admin: {
    readOnly: true,
  },
  options: [
    {
      label: 'Collection',
      value: 'collection',
    },
    {
      label: 'Global',
      value: 'global',
    },
  ],
  required: true,
};

export const createImageTransformDerivativeCollection = (
  options: CreateImageTransformDerivativeCollectionOptions = {},
): CollectionConfig => {
  const {
    slug = 'imageTransformDerivatives',
    sourceRelationTo = IMAGE_TRANSFORM_PENDING_SOURCE_RELATION,
    upload = true,
    ...overrides
  } = options;
  return {
    slug,
    admin: {
      useAsTitle: 'filename',
      ...(overrides.admin ?? {}),
    },
    ...overrides,
    fields: [
      {
        name: 'source',
        label: 'Source upload',
        type: 'relationship',
        relationTo: sourceRelationTo,
        required: true,
        admin: {
          readOnly: true,
        },
      } satisfies RelationshipField,
      readonlyTextField('sourceCollection', 'Source collection'),
      readonlyTextField('sourceID', 'Source ID'),
      readonlyTextField('sourceVersion', 'Source version'),
      ownerKindField,
      readonlyTextField('ownerSlug', 'Owner slug'),
      readonlyTextField('ownerID', 'Owner ID'),
      readonlyTextField('fieldPath', 'Field path'),
      readonlyTextField('usagePath', 'Usage path'),
      readonlyTextField('presetKey', 'Preset key'),
      readonlyTextField('presetAspectRatio', 'Preset aspect ratio'),
      readonlyTextField('fingerprint', 'Fingerprint'),
    ],
    upload,
  };
};
