import { IMAGE_TRANSFORM_FIELD_CUSTOM_KEY } from '../../fields/image-transform/types';

import type {
  ImageTransformOwnerContext,
  ImageTransformOwnerKind,
} from './types';
import type {
  ImageTransformFieldCustom,
  ImageTransformFieldValue,
} from '../../fields/image-transform';
import type {
  ArrayField,
  Block,
  BlocksField,
  CollectionConfig,
  Field,
  GlobalConfig,
  GroupField,
  Tab,
  TabsField,
} from 'payload';

type OwnerEntityConfig =
  | Pick<CollectionConfig, 'fields' | 'slug'>
  | Pick<GlobalConfig, 'fields' | 'slug'>;

const isObject = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' && value !== null;

const isNamedField = (field: Field | Tab): field is Field & { name: string } =>
  'name' in field && typeof field.name === 'string';

const isGroupField = (field: Field): field is GroupField =>
  field.type === 'group' || field.type === 'collapsible';

const isArrayField = (field: Field): field is ArrayField =>
  field.type === 'array';

const isBlocksField = (field: Field): field is BlocksField =>
  field.type === 'blocks';

const isTabsField = (field: Field): field is TabsField => field.type === 'tabs';

const getImageTransformCustom = (
  field: Field,
): ImageTransformFieldCustom | undefined => {
  const rawCustom = isObject<{ custom?: unknown }>(field)
    ? (field.custom as { imageTransform?: unknown } | undefined)?.[
        IMAGE_TRANSFORM_FIELD_CUSTOM_KEY
      ]
    : undefined;

  if (!isObject<ImageTransformFieldCustom>(rawCustom)) {
    return undefined;
  }

  return rawCustom;
};

const normalizeFieldValue = (value: unknown): ImageTransformFieldValue =>
  isObject<ImageTransformFieldValue>(value) ? value : {};

export const splitImageTransformFieldPath = (fieldPath: string): string[] =>
  fieldPath
    .split('.')
    .map((segment) => segment.trim())
    .filter(Boolean);

export const getValueAtPath = (value: unknown, fieldPath: string): unknown => {
  const segments = splitImageTransformFieldPath(fieldPath);

  return segments.reduce<unknown>((current, segment) => {
    if (Array.isArray(current)) {
      const index = Number(segment);

      if (!Number.isInteger(index)) {
        return undefined;
      }

      return current[index];
    }

    if (!isObject<Record<string, unknown>>(current)) {
      return undefined;
    }

    return current[segment];
  }, value);
};

const cloneWithValueAtSegments = (
  current: unknown,
  segments: readonly string[],
  nextValue: unknown,
): unknown => {
  if (segments.length === 0) {
    return nextValue;
  }

  const [segment, ...rest] = segments;

  if (!segment) {
    return nextValue;
  }

  if (Array.isArray(current)) {
    const index = Number(segment);
    const nextArray = [...current];

    nextArray[index] = cloneWithValueAtSegments(
      nextArray[index],
      rest,
      nextValue,
    );

    return nextArray;
  }

  const currentObject = isObject<Record<string, unknown>>(current)
    ? current
    : {};

  return {
    ...currentObject,
    [segment]: cloneWithValueAtSegments(
      currentObject[segment],
      rest,
      nextValue,
    ),
  };
};

export const createImageTransformFieldPatch = ({
  data,
  fieldPath,
  value,
}: {
  data: Record<string, unknown>;
  fieldPath: string;
  value: ImageTransformFieldValue;
}): Record<string, unknown> => {
  const [rootField, ...rest] = splitImageTransformFieldPath(fieldPath);

  if (!rootField) {
    return {};
  }

  return {
    [rootField]: cloneWithValueAtSegments(data[rootField], rest, value),
  };
};

const resolveFromTabs = ({
  dataSegments,
  data,
  defaultSourceRelationTo,
  ownerID,
  ownerKind,
  ownerSlug,
  segments,
  tabs,
  schemaSegments,
  usageSegments,
}: {
  dataSegments: string[];
  data: unknown;
  defaultSourceRelationTo?: string;
  ownerID?: string;
  ownerKind: ImageTransformOwnerKind;
  ownerSlug: string;
  schemaSegments: string[];
  segments: readonly string[];
  tabs: readonly Tab[];
  usageSegments: string[];
}): ImageTransformOwnerContext | undefined => {
  for (const tab of tabs) {
    if (tabHasName(tab)) {
      if (segments[0] !== tab.name) {
        continue;
      }

      const nextData = isObject<Record<string, unknown>>(data)
        ? data[tab.name]
        : undefined;

      const resolved = resolveOwnerContextFromFields({
        dataSegments: [...dataSegments, tab.name],
        data: nextData,
        defaultSourceRelationTo,
        fields: tab.fields,
        ownerID,
        ownerKind,
        ownerSlug,
        schemaSegments: [...schemaSegments, tab.name],
        segments: segments.slice(1),
        usageSegments: [...usageSegments, tab.name],
      });

      if (resolved) {
        return resolved;
      }

      continue;
    }

    const resolved = resolveOwnerContextFromFields({
      dataSegments,
      data,
      defaultSourceRelationTo,
      fields: tab.fields,
      ownerID,
      ownerKind,
      ownerSlug,
      schemaSegments,
      segments,
      usageSegments,
    });

    if (resolved) {
      return resolved;
    }
  }

  return undefined;
};

const tabHasName = (tab: Tab): tab is Tab & { name: string } =>
  'name' in tab && typeof tab.name === 'string';

const resolveFromArray = ({
  dataSegments,
  data,
  defaultSourceRelationTo,
  field,
  ownerID,
  ownerKind,
  ownerSlug,
  schemaSegments,
  segments,
  usageSegments,
}: {
  dataSegments: string[];
  data: unknown;
  defaultSourceRelationTo?: string;
  field: ArrayField;
  ownerID?: string;
  ownerKind: ImageTransformOwnerKind;
  ownerSlug: string;
  schemaSegments: string[];
  segments: readonly string[];
  usageSegments: string[];
}): ImageTransformOwnerContext | undefined => {
  const [rowIndexSegment, ...rest] = segments;
  const rowIndex = Number(rowIndexSegment);
  const rowPathSegment = rowIndex.toString();

  if (!Number.isInteger(rowIndex) || !Array.isArray(data)) {
    return undefined;
  }

  const row = data[rowIndex];
  const rowID =
    isObject<{ id?: unknown; _id?: unknown }>(row) &&
    (typeof row.id === 'string' || typeof row.id === 'number')
      ? String(row.id)
      : isObject<{ _id?: unknown }>(row) &&
          (typeof row._id === 'string' || typeof row._id === 'number')
        ? String(row._id)
        : `index:${rowIndex.toString()}`;

  return resolveOwnerContextFromFields({
    dataSegments: [...dataSegments, rowPathSegment],
    data: row,
    defaultSourceRelationTo,
    fields: field.fields,
    ownerID,
    ownerKind,
    ownerSlug,
    schemaSegments,
    segments: rest,
    usageSegments: [...usageSegments, rowID],
  });
};

const findBlockBySlug = (
  blocks: readonly Block[],
  blockSlug: string,
): Block | undefined => blocks.find((block) => block.slug === blockSlug);

const resolveFromBlocks = ({
  dataSegments,
  data,
  defaultSourceRelationTo,
  field,
  ownerID,
  ownerKind,
  ownerSlug,
  schemaSegments,
  segments,
  usageSegments,
}: {
  dataSegments: string[];
  data: unknown;
  defaultSourceRelationTo?: string;
  field: BlocksField;
  ownerID?: string;
  ownerKind: ImageTransformOwnerKind;
  ownerSlug: string;
  schemaSegments: string[];
  segments: readonly string[];
  usageSegments: string[];
}): ImageTransformOwnerContext | undefined => {
  const [rowIndexSegment, ...rest] = segments;
  const rowIndex = Number(rowIndexSegment);
  const rowPathSegment = rowIndex.toString();

  if (!Number.isInteger(rowIndex) || !Array.isArray(data)) {
    return undefined;
  }

  const row = data[rowIndex];

  if (
    !isObject<{ blockType?: unknown; id?: unknown }>(row) ||
    typeof row.blockType !== 'string'
  ) {
    return undefined;
  }

  const block = findBlockBySlug(field.blocks, row.blockType);

  if (!block) {
    return undefined;
  }

  const rowID =
    typeof row.id === 'string' || typeof row.id === 'number'
      ? String(row.id)
      : `index:${rowIndex.toString()}`;

  return resolveOwnerContextFromFields({
    dataSegments: [...dataSegments, rowPathSegment],
    data: row,
    defaultSourceRelationTo,
    fields: block.fields,
    ownerID,
    ownerKind,
    ownerSlug,
    schemaSegments: [...schemaSegments, block.slug],
    segments: rest,
    usageSegments: [...usageSegments, rowID, block.slug],
  });
};

const resolveOwnerContextFromFields = ({
  dataSegments,
  data,
  defaultSourceRelationTo,
  fields,
  ownerID,
  ownerKind,
  ownerSlug,
  schemaSegments,
  segments,
  usageSegments,
}: {
  dataSegments: string[];
  data: unknown;
  defaultSourceRelationTo?: string;
  fields: readonly Field[];
  ownerID?: string;
  ownerKind: ImageTransformOwnerKind;
  ownerSlug: string;
  schemaSegments: string[];
  segments: readonly string[];
  usageSegments: string[];
}): ImageTransformOwnerContext | undefined => {
  if (segments.length === 0) {
    return undefined;
  }

  const [segment, ...rest] = segments;

  for (const field of fields) {
    if (field.type === 'row') {
      const resolved = resolveOwnerContextFromFields({
        dataSegments,
        data,
        defaultSourceRelationTo,
        fields: field.fields,
        ownerID,
        ownerKind,
        ownerSlug,
        schemaSegments,
        segments,
        usageSegments,
      });

      if (resolved) {
        return resolved;
      }

      continue;
    }

    if (isTabsField(field)) {
      const resolved = resolveFromTabs({
        dataSegments,
        data,
        defaultSourceRelationTo,
        ownerID,
        ownerKind,
        ownerSlug,
        schemaSegments,
        segments,
        tabs: field.tabs,
        usageSegments,
      });

      if (resolved) {
        return resolved;
      }

      continue;
    }

    if (!isNamedField(field) || field.name !== segment) {
      continue;
    }

    const fieldValue = isObject<Record<string, unknown>>(data)
      ? data[field.name]
      : undefined;
    const nextDataSegments = [...dataSegments, field.name];
    const nextSchemaSegments = [...schemaSegments, field.name];
    const nextUsageSegments = [...usageSegments, field.name];
    const imageTransformCustom = getImageTransformCustom(field);

    if (imageTransformCustom) {
      const relationTo =
        imageTransformCustom.relationTo ?? defaultSourceRelationTo;

      if (!relationTo) {
        throw new Error(
          `Image transform field "${nextSchemaSegments.join('.')}" is missing a source relation.`,
        );
      }

      return {
        dataPath: nextDataSegments.join('.'),
        fieldPath: nextSchemaSegments.join('.'),
        ownerID,
        ownerKind,
        ownerSlug,
        presetByKey: new Map(
          imageTransformCustom.presets.map((preset) => [preset.key, preset]),
        ),
        presets: imageTransformCustom.presets,
        relationTo,
        usagePath: nextUsageSegments.join('.'),
        value: normalizeFieldValue(fieldValue),
      };
    }

    if (isGroupField(field)) {
      const resolved = resolveOwnerContextFromFields({
        dataSegments: nextDataSegments,
        data: fieldValue,
        defaultSourceRelationTo,
        fields: field.fields,
        ownerID,
        ownerKind,
        ownerSlug,
        schemaSegments: nextSchemaSegments,
        segments: rest,
        usageSegments: nextUsageSegments,
      });

      if (resolved) {
        return resolved;
      }

      continue;
    }

    if (isArrayField(field)) {
      const resolved = resolveFromArray({
        dataSegments: nextDataSegments,
        data: fieldValue,
        defaultSourceRelationTo,
        field,
        ownerID,
        ownerKind,
        ownerSlug,
        schemaSegments: nextSchemaSegments,
        segments: rest,
        usageSegments: nextUsageSegments,
      });

      if (resolved) {
        return resolved;
      }

      continue;
    }

    if (isBlocksField(field)) {
      const resolved = resolveFromBlocks({
        dataSegments: nextDataSegments,
        data: fieldValue,
        defaultSourceRelationTo,
        field,
        ownerID,
        ownerKind,
        ownerSlug,
        schemaSegments: nextSchemaSegments,
        segments: rest,
        usageSegments: nextUsageSegments,
      });

      if (resolved) {
        return resolved;
      }
    }
  }

  return undefined;
};

export const resolveOwnerContext = ({
  dataPath,
  doc,
  defaultSourceRelationTo,
  entity,
  ownerID,
  ownerKind,
}: {
  dataPath: string;
  doc: Record<string, unknown>;
  defaultSourceRelationTo?: string;
  entity: OwnerEntityConfig;
  ownerID?: string;
  ownerKind: ImageTransformOwnerKind;
}): ImageTransformOwnerContext => {
  const resolved = resolveOwnerContextFromFields({
    dataSegments: [],
    data: doc,
    defaultSourceRelationTo,
    fields: entity.fields,
    ownerID,
    ownerKind,
    ownerSlug: entity.slug,
    schemaSegments: [],
    segments: splitImageTransformFieldPath(dataPath),
    usageSegments: [],
  });

  if (!resolved) {
    throw new Error(
      `Unable to resolve image transform field context for path "${dataPath}" on "${entity.slug}".`,
    );
  }

  return resolved;
};
