import { IMAGE_TRANSFORM_FIELD_CUSTOM_KEY } from '../../fields/image-transform/types.js';

import {
  deleteDerivativeByID,
  cleanupOwnerDerivatives,
  cleanupReplacedDerivatives,
  cleanupSourceDerivatives,
} from './cleanup.js';
import {
  buildImageTransformFingerprint,
  getImageTransformRelationID,
  getImageTransformRelationScalarID,
  getImageTransformSourceVersion,
} from './fingerprint.js';
import { generateDerivative } from './generate-derivative.js';
import {
  createImageTransformFieldPatch,
  getValueAtPath,
  resolveOwnerContext,
} from './resolve-owner-context.js';
import { DEFAULT_IMAGE_TRANSFORM_ENDPOINT_PATH } from './types.js';

import type {
  ImageTransformAction,
  ImageTransformGenerateRequest,
  ImageTransformGenerationResult,
  ImageTransformPluginOptions,
} from './types.js';
import type {
  ImageTransformFieldCustom,
  ImageTransformFieldValue,
} from '../../fields/image-transform/index.js';
import type {
  CollectionConfig,
  Config,
  Field,
  GlobalConfig,
  PayloadRequest,
} from 'payload';

const isObject = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' && value !== null;

const isNamedField = (field: Field): field is Field & { name: string } =>
  'name' in field && typeof field.name === 'string';

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

const updateImageTransformAdminCustom = (
  field: Field,
  custom: ImageTransformFieldCustom,
): Field =>
  ({
    ...field,
    admin: {
      ...(field.admin ?? {}),
      custom: {
        ...(field.admin?.custom ?? {}),
        [IMAGE_TRANSFORM_FIELD_CUSTOM_KEY]: custom,
      },
    },
    custom: {
      ...(field.custom ?? {}),
      [IMAGE_TRANSFORM_FIELD_CUSTOM_KEY]: custom,
    },
  }) as Field;

const hydratePresetGroupFields = (
  fields: readonly Field[],
  derivativeCollectionSlug: string,
): Field[] =>
  fields.map((field) => {
    if (isNamedField(field) && field.name === 'derivative') {
      return {
        ...field,
        relationTo: derivativeCollectionSlug,
      } as Field;
    }

    return field;
  });

const hydrateImageTransformField = ({
  defaultSourceRelationTo,
  derivativeCollectionSlug,
  field,
}: {
  defaultSourceRelationTo?: string;
  derivativeCollectionSlug: string;
  field: Field;
}): Field => {
  const custom = getImageTransformCustom(field);

  if (!custom || field.type !== 'group') {
    return field;
  }

  const relationTo = custom.relationTo ?? defaultSourceRelationTo;

  if (!relationTo) {
    const fieldName = isNamedField(field) ? field.name : '(unnamed)';

    throw new Error(
      `Image transform field "${fieldName}" requires a relationTo option or plugin defaultSourceRelationTo.`,
    );
  }

  const nextCustom: ImageTransformFieldCustom = {
    ...custom,
    derivativeCollectionSlug,
    relationTo,
  };

  const nextField = updateImageTransformAdminCustom(
    field,
    nextCustom,
  ) as Field & {
    fields: Field[];
  };

  nextField.fields = nextField.fields.map((childField) => {
    if (isNamedField(childField) && childField.name === 'source') {
      return {
        ...childField,
        relationTo,
      } as Field;
    }

    if (
      childField.type === 'group' &&
      isNamedField(childField) &&
      childField.name === 'presets'
    ) {
      return {
        ...childField,
        fields: childField.fields.map((presetField) => {
          if (presetField.type !== 'group') {
            return presetField;
          }

          return {
            ...presetField,
            fields: hydratePresetGroupFields(
              presetField.fields,
              derivativeCollectionSlug,
            ),
          };
        }),
      } as Field;
    }

    return childField;
  });

  return nextField;
};

const mapFields = (
  fields: readonly Field[],
  mapper: (field: Field) => Field,
): Field[] =>
  fields.map((field) => {
    if (field.type === 'row') {
      return {
        ...field,
        fields: mapFields(field.fields, mapper),
      } as Field;
    }

    if (field.type === 'tabs') {
      return {
        ...field,
        tabs: field.tabs.map((tab) => ({
          ...tab,
          fields: mapFields(tab.fields, mapper),
        })),
      } as Field;
    }

    if (field.type === 'group' || field.type === 'collapsible') {
      const mappedField = mapper(field);

      if (mappedField.type !== 'group' && mappedField.type !== 'collapsible') {
        return mappedField;
      }

      return {
        ...mappedField,
        fields: mapFields(mappedField.fields, mapper),
      } as Field;
    }

    if (field.type === 'array') {
      return {
        ...field,
        fields: mapFields(field.fields, mapper),
      } as Field;
    }

    if (field.type === 'blocks') {
      return {
        ...field,
        blocks: field.blocks.map((block) => ({
          ...block,
          fields: mapFields(block.fields, mapper),
        })),
      } as Field;
    }

    return mapper(field);
  }) as Field[];

const collectImageTransformSourceSlugs = (
  fields: readonly Field[],
  defaultSourceRelationTo?: string,
): Set<string> => {
  const sourceSlugs = new Set<string>();

  const visit = (fieldList: readonly Field[]) => {
    for (const field of fieldList) {
      const custom = getImageTransformCustom(field);

      if (custom?.relationTo ?? defaultSourceRelationTo) {
        sourceSlugs.add(String(custom?.relationTo ?? defaultSourceRelationTo));
      }

      if (field.type === 'row' || field.type === 'array') {
        visit(field.fields);
        continue;
      }

      if (field.type === 'group' || field.type === 'collapsible') {
        visit(field.fields);
        continue;
      }

      if (field.type === 'blocks') {
        field.blocks.forEach((block) => visit(block.fields));
        continue;
      }

      if (field.type === 'tabs') {
        field.tabs.forEach((tab) => visit(tab.fields));
      }
    }
  };

  visit(fields);

  return sourceSlugs;
};

const hasImageTransformField = (fields: readonly Field[]): boolean => {
  const visit = (fieldList: readonly Field[]): boolean => {
    for (const field of fieldList) {
      if (getImageTransformCustom(field)) {
        return true;
      }

      if (field.type === 'row' || field.type === 'array') {
        if (visit(field.fields)) {
          return true;
        }

        continue;
      }

      if (field.type === 'group' || field.type === 'collapsible') {
        if (visit(field.fields)) {
          return true;
        }

        continue;
      }

      if (field.type === 'blocks') {
        if (field.blocks.some((block) => visit(block.fields))) {
          return true;
        }

        continue;
      }

      if (
        field.type === 'tabs' &&
        field.tabs.some((tab) => visit(tab.fields))
      ) {
        return true;
      }
    }

    return false;
  };

  return visit(fields);
};

const loadOwnerDocument = async ({
  collectionSlug,
  draft,
  globalSlug,
  id,
  req,
}: {
  collectionSlug?: string;
  draft?: boolean;
  globalSlug?: string;
  id?: number | string;
  req: PayloadRequest;
}): Promise<Record<string, unknown>> => {
  if (collectionSlug) {
    if (id === undefined) {
      throw new Error(
        'A collection owner ID is required for image transform generation.',
      );
    }

    return (await req.payload.findByID({
      collection: collectionSlug,
      depth: 2,
      draft,
      id,
      overrideAccess: true,
      req,
      showHiddenFields: true,
    })) as Record<string, unknown>;
  }

  if (globalSlug) {
    return (await req.payload.findGlobal({
      depth: 2,
      draft,
      overrideAccess: true,
      req,
      showHiddenFields: true,
      slug: globalSlug,
    })) as Record<string, unknown>;
  }

  throw new Error(
    'An image transform generation request must target a collection or global.',
  );
};

const persistOwnerDocument = async ({
  collectionSlug,
  draft,
  globalSlug,
  id,
  patch,
  req,
}: {
  collectionSlug?: string;
  draft?: boolean;
  globalSlug?: string;
  id?: number | string;
  patch: Record<string, unknown>;
  req: PayloadRequest;
}): Promise<Record<string, unknown>> => {
  if (collectionSlug) {
    if (id === undefined) {
      throw new Error(
        'A collection owner ID is required for image transform updates.',
      );
    }

    return (await req.payload.update({
      collection: collectionSlug,
      data: patch,
      depth: 2,
      draft,
      id,
      overrideAccess: true,
      req,
      showHiddenFields: true,
    })) as Record<string, unknown>;
  }

  if (globalSlug) {
    return (await req.payload.updateGlobal({
      data: patch,
      depth: 2,
      draft,
      overrideAccess: true,
      req,
      showHiddenFields: true,
      slug: globalSlug,
    })) as Record<string, unknown>;
  }

  throw new Error(
    'An image transform update must target a collection or global.',
  );
};

const normalizeRequestBody = (
  value: unknown,
): ImageTransformGenerateRequest => {
  if (!isObject<ImageTransformGenerateRequest>(value)) {
    throw new Error('Invalid image transform request payload.');
  }

  const dataPath =
    typeof value.dataPath === 'string' && value.dataPath.length > 0
      ? value.dataPath
      : typeof value.fieldPath === 'string' && value.fieldPath.length > 0
        ? value.fieldPath
        : undefined;

  if (!dataPath) {
    throw new Error('The image transform request is missing a dataPath.');
  }

  const action: ImageTransformAction =
    value.action === 'clear' ? 'clear' : 'generate';
  const fieldValue = isObject<ImageTransformFieldValue>(value.fieldValue)
    ? value.fieldValue
    : undefined;

  return {
    ...value,
    action,
    dataPath,
    fieldValue,
  };
};

const hasDraftsEnabled = (entity: CollectionConfig | GlobalConfig): boolean => {
  const versions = entity.versions;

  if (!versions) {
    return false;
  }

  if (typeof versions === 'object') {
    return 'drafts' in versions ? Boolean(versions.drafts) : true;
  }

  return Boolean(versions);
};

const persistImageTransformFieldValue = async ({
  collectionSlug,
  dataPath,
  draft,
  globalSlug,
  id,
  ownerDoc,
  req,
  value,
}: {
  collectionSlug?: string;
  dataPath: string;
  draft: boolean;
  globalSlug?: string;
  id?: number | string;
  ownerDoc: Record<string, unknown>;
  req: PayloadRequest;
  value: ImageTransformFieldValue;
}): Promise<Record<string, unknown>> =>
  persistOwnerDocument({
    collectionSlug,
    draft,
    globalSlug,
    id,
    patch: createImageTransformFieldPatch({
      data: ownerDoc,
      fieldPath: dataPath,
      value,
    }),
    req,
  });

const createGenerationHandler = ({
  collections,
  defaultSourceRelationTo,
  derivativeCollectionSlug,
  globals,
}: {
  collections: readonly CollectionConfig[];
  defaultSourceRelationTo?: string;
  derivativeCollectionSlug: string;
  globals: readonly GlobalConfig[];
}): Exclude<Config['endpoints'], undefined>[number]['handler'] => {
  const collectionBySlug = new Map(
    collections.map((collection) => [collection.slug, collection]),
  );
  const globalBySlug = new Map(globals.map((global) => [global.slug, global]));

  return async (req) => {
    try {
      if (typeof req.json !== 'function') {
        throw new Error(
          'The image transform endpoint requires a JSON request body.',
        );
      }

      const requestBody = normalizeRequestBody(await req.json());
      const action = requestBody.action ?? 'generate';
      const collectionSlug = requestBody.collectionSlug
        ? String(requestBody.collectionSlug)
        : undefined;
      const dataPath = String(requestBody.dataPath ?? requestBody.fieldPath);
      const globalSlug = requestBody.globalSlug
        ? String(requestBody.globalSlug)
        : undefined;
      const ownerKind = collectionSlug ? 'collection' : 'global';
      const entity = collectionSlug
        ? collectionBySlug.get(collectionSlug)
        : globalSlug
          ? globalBySlug.get(globalSlug)
          : undefined;

      if (!entity) {
        throw new Error(
          'Unable to resolve the requested image transform owner.',
        );
      }

      const draft = hasDraftsEnabled(entity);
      const ownerID =
        requestBody.id === undefined ? undefined : String(requestBody.id);

      let ownerDoc = await loadOwnerDocument({
        collectionSlug,
        draft,
        globalSlug,
        id: requestBody.id,
        req,
      });

      if (requestBody.fieldValue) {
        ownerDoc = await persistImageTransformFieldValue({
          collectionSlug,
          dataPath,
          draft,
          globalSlug,
          id: requestBody.id,
          ownerDoc,
          req,
          value: requestBody.fieldValue,
        });
      }

      let ownerContext = resolveOwnerContext({
        dataPath,
        doc: ownerDoc,
        defaultSourceRelationTo,
        entity,
        ownerID,
        ownerKind,
      });
      const presetKeys =
        requestBody.presetKeys && requestBody.presetKeys.length > 0
          ? [...requestBody.presetKeys]
          : ownerContext.presets.map((preset) => preset.key);
      const generatedPresetKeys: string[] = [];
      const errors: Record<string, string> = {};

      for (const presetKey of presetKeys) {
        const preset = ownerContext.presetByKey.get(presetKey);

        if (!preset) {
          errors[presetKey] = `Unknown image transform preset "${presetKey}".`;
          continue;
        }

        const currentValue = ownerContext.value;
        const currentPresetValue =
          currentValue.presets?.[presetKey] ?? undefined;
        const currentSourceVersion = getImageTransformSourceVersion(
          currentValue.source,
        );
        const previousDerivativeID = getImageTransformRelationID(
          currentPresetValue?.derivative,
        );
        const previousDerivativeScalarID = getImageTransformRelationScalarID(
          currentPresetValue?.derivative,
        );

        if (action === 'clear') {
          const clearedPreset = {
            crop: {
              x: null,
              y: null,
              zoom: null,
            },
            derivative: null,
            fingerprint: null,
            lastError: null,
            lastGeneratedAt: null,
            sourceVersion: null,
            state: null,
          } as unknown as NonNullable<
            ImageTransformFieldValue['presets']
          >[string];
          const nextValue: ImageTransformFieldValue = {
            ...currentValue,
            presets: {
              ...(currentValue.presets ?? {}),
              [presetKey]: clearedPreset,
            },
          };

          try {
            ownerDoc = await persistImageTransformFieldValue({
              collectionSlug,
              dataPath,
              draft,
              globalSlug,
              id: requestBody.id,
              ownerDoc,
              req,
              value: nextValue,
            });
            ownerContext = resolveOwnerContext({
              dataPath,
              doc: ownerDoc,
              defaultSourceRelationTo,
              entity,
              ownerID,
              ownerKind,
            });

            if (previousDerivativeScalarID !== undefined) {
              await deleteDerivativeByID({
                allowMissing: true,
                derivativeCollectionSlug,
                id: previousDerivativeScalarID,
                req,
              });
            }
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : 'Derivative clearing failed.';

            errors[presetKey] = message;
          }

          continue;
        }

        const source = currentValue.source;
        const sourceID = getImageTransformRelationID(source);

        if (!sourceID || !source) {
          errors[presetKey] =
            'Select and save a source image before generating derivatives.';
          continue;
        }

        let createdDerivativeID: number | string | undefined;

        try {
          const { derivativeDoc, fingerprint, sourceVersion } =
            await generateDerivative({
              derivativeCollectionSlug,
              fieldPath: ownerContext.fieldPath,
              ownerID: ownerContext.ownerID,
              ownerKind: ownerContext.ownerKind,
              ownerSlug: ownerContext.ownerSlug,
              preset,
              presetValue: currentPresetValue,
              req,
              source,
              sourceRelationTo: String(ownerContext.relationTo),
              usagePath: ownerContext.usagePath,
            });
          createdDerivativeID =
            (derivativeDoc.id as number | string | undefined) ??
            (derivativeDoc._id as number | string | undefined);
          const nextValue: ImageTransformFieldValue = {
            ...currentValue,
            presets: {
              ...(currentValue.presets ?? {}),
              [presetKey]: {
                ...currentPresetValue,
                derivative: derivativeDoc as ImageTransformFieldValue['source'],
                fingerprint,
                lastError: undefined,
                lastGeneratedAt: new Date().toISOString(),
                sourceVersion,
                state: 'ready',
              },
            },
          };

          ownerDoc = await persistImageTransformFieldValue({
            collectionSlug,
            dataPath,
            draft,
            globalSlug,
            id: requestBody.id,
            ownerDoc,
            req,
            value: nextValue,
          });
          ownerContext = resolveOwnerContext({
            dataPath,
            doc: ownerDoc,
            defaultSourceRelationTo,
            entity,
            ownerID,
            ownerKind,
          });

          if (
            previousDerivativeScalarID !== undefined &&
            createdDerivativeID !== undefined &&
            previousDerivativeScalarID !== createdDerivativeID
          ) {
            await deleteDerivativeByID({
              allowMissing: true,
              derivativeCollectionSlug,
              id: previousDerivativeScalarID,
              req,
            });
          }

          generatedPresetKeys.push(presetKey);
        } catch (error) {
          if (createdDerivativeID !== undefined) {
            await deleteDerivativeByID({
              allowMissing: true,
              derivativeCollectionSlug,
              id: createdDerivativeID,
              req,
            }).catch(() => undefined);
          }

          const message =
            error instanceof Error
              ? error.message
              : 'Derivative generation failed.';
          const nextFingerprint = buildImageTransformFingerprint({
            crop: currentPresetValue?.crop,
            preset,
            source,
          });
          const nextState = previousDerivativeID ? 'stale' : 'failed';
          const nextValue: ImageTransformFieldValue = {
            ...currentValue,
            presets: {
              ...(currentValue.presets ?? {}),
              [presetKey]: {
                ...currentPresetValue,
                fingerprint: nextFingerprint,
                lastError: message,
                sourceVersion:
                  currentSourceVersion ?? currentPresetValue?.sourceVersion,
                state: nextState,
              },
            },
          };

          ownerDoc = await persistImageTransformFieldValue({
            collectionSlug,
            dataPath,
            draft,
            globalSlug,
            id: requestBody.id,
            ownerDoc,
            req,
            value: nextValue,
          });
          ownerContext = resolveOwnerContext({
            dataPath,
            doc: ownerDoc,
            defaultSourceRelationTo,
            entity,
            ownerID,
            ownerKind,
          });
          errors[presetKey] = message;
        }
      }

      const response: ImageTransformGenerationResult = {
        doc: ownerDoc,
        errors,
        generatedPresetKeys,
        value:
          (getValueAtPath(ownerDoc, dataPath) as ImageTransformFieldValue) ??
          {},
      };

      return Response.json(response, { status: 200 });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Image transform generation failed.';

      return Response.json({ error: message }, { status: 400 });
    }
  };
};

const appendCollectionHooks = ({
  collection,
  derivativeCollectionSlug,
  isSourceCollection,
}: {
  collection: CollectionConfig;
  derivativeCollectionSlug: string;
  isSourceCollection: boolean;
}): CollectionConfig => {
  const hooks = collection.hooks ?? {};
  const hasTransforms = hasImageTransformField(collection.fields);
  const afterChange = [...(hooks.afterChange ?? [])];
  const afterDelete = [...(hooks.afterDelete ?? [])];

  if (hasTransforms) {
    afterChange.push(
      async ({ collection: ownerCollection, doc, previousDoc, req }) => {
        await cleanupReplacedDerivatives({
          derivativeCollectionSlug,
          fields: ownerCollection.fields,
          nextDoc: doc as Record<string, unknown>,
          previousDoc: previousDoc as Record<string, unknown>,
          req,
        });

        return doc;
      },
    );

    afterDelete.push(async ({ collection: ownerCollection, doc, req }) => {
      await cleanupOwnerDerivatives({
        derivativeCollectionSlug,
        ownerID: String(doc.id ?? ''),
        ownerKind: 'collection',
        ownerSlug: ownerCollection.slug,
        req,
      });

      return doc;
    });
  }

  if (isSourceCollection) {
    afterDelete.push(async ({ collection: sourceCollection, doc, req }) => {
      await cleanupSourceDerivatives({
        derivativeCollectionSlug,
        req,
        sourceCollection: sourceCollection.slug,
        sourceID: String(doc.id ?? ''),
      });

      return doc;
    });
  }

  return {
    ...collection,
    hooks: {
      ...hooks,
      afterChange,
      afterDelete,
    },
  };
};

const appendGlobalHooks = ({
  derivativeCollectionSlug,
  global,
}: {
  derivativeCollectionSlug: string;
  global: GlobalConfig;
}): GlobalConfig => {
  if (!hasImageTransformField(global.fields)) {
    return global;
  }

  const hooks = global.hooks ?? {};

  return {
    ...global,
    hooks: {
      ...hooks,
      afterChange: [
        ...(hooks.afterChange ?? []),
        async ({ doc, global: ownerGlobal, previousDoc, req }) => {
          await cleanupReplacedDerivatives({
            derivativeCollectionSlug,
            fields: ownerGlobal.fields,
            nextDoc: doc as Record<string, unknown>,
            previousDoc: previousDoc as Record<string, unknown>,
            req,
          });

          return doc;
        },
      ],
    },
  };
};

export const imageTransformPlugin =
  (pluginOptions: ImageTransformPluginOptions) =>
  (config: Config): Config => {
    const derivativeCollectionSlug = String(
      pluginOptions.derivativeCollectionSlug,
    );
    const defaultSourceRelationTo = pluginOptions.defaultSourceRelationTo
      ? String(pluginOptions.defaultSourceRelationTo)
      : undefined;
    const endpointPath =
      pluginOptions.endpointPath ?? DEFAULT_IMAGE_TRANSFORM_ENDPOINT_PATH;
    const transformedCollections = (config.collections ?? []).map(
      (collection) => ({
        ...collection,
        fields: mapFields(collection.fields, (field) =>
          hydrateImageTransformField({
            defaultSourceRelationTo,
            derivativeCollectionSlug,
            field,
          }),
        ),
      }),
    );
    const transformedGlobals = (config.globals ?? []).map((global) => ({
      ...global,
      fields: mapFields(global.fields, (field) =>
        hydrateImageTransformField({
          defaultSourceRelationTo,
          derivativeCollectionSlug,
          field,
        }),
      ),
    }));
    const sourceCollectionSlugs = new Set<string>();

    for (const collection of transformedCollections) {
      collectImageTransformSourceSlugs(
        collection.fields,
        defaultSourceRelationTo,
      ).forEach((slug) => sourceCollectionSlugs.add(slug));
    }

    for (const global of transformedGlobals) {
      collectImageTransformSourceSlugs(
        global.fields,
        defaultSourceRelationTo,
      ).forEach((slug) => sourceCollectionSlugs.add(slug));
    }

    return {
      ...config,
      collections: transformedCollections.map((collection) =>
        appendCollectionHooks({
          collection,
          derivativeCollectionSlug,
          isSourceCollection: sourceCollectionSlugs.has(collection.slug),
        }),
      ),
      endpoints: [
        ...(config.endpoints ?? []),
        {
          handler: createGenerationHandler({
            collections: transformedCollections,
            defaultSourceRelationTo,
            derivativeCollectionSlug,
            globals: transformedGlobals,
          }),
          method: 'post',
          path: endpointPath,
        },
      ],
      globals: transformedGlobals.map((global) =>
        appendGlobalHooks({
          derivativeCollectionSlug,
          global,
        }),
      ),
    };
  };
