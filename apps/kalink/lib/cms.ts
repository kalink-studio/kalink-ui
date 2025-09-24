import { isObject } from '@kalink-ui/dibbly';
import { cache } from 'react';

import { getPayloadClient } from './payload';

import type {
  Block,
  CourseSessions,
  MainNavigationItem,
  Media,
  Page,
} from '../types/cms';
import type { Payload } from 'payload';

const PAGE_DEPTH = 3;

type UnknownRecord = Record<string, unknown>;

const asBlocks = (value: unknown): Block[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as Block[];
};

const mapPage = (doc: unknown): Page => {
  if (!isObject<UnknownRecord>(doc)) {
    throw new Error('Invalid page document received from Payload');
  }

  const id = doc.id ?? doc._id;

  const seoRaw = isObject<UnknownRecord>(doc.seo) ? doc.seo : undefined;

  const metaImageRaw = seoRaw?.metaImage;
  let metaImage: NonNullable<Page['seo']>['metaImage'];

  if (isObject<Media>(metaImageRaw) && typeof metaImageRaw.url === 'string') {
    metaImage = metaImageRaw;
  } else if (typeof metaImageRaw === 'string') {
    metaImage = metaImageRaw;
  } else {
    metaImage = undefined;
  }

  return {
    id: typeof id === 'string' ? id : String(id ?? ''),
    title: typeof doc.title === 'string' ? doc.title : '',
    slug: typeof doc.slug === 'string' ? doc.slug : '',
    navigationLabel:
      typeof doc.navigationLabel === 'string' ? doc.navigationLabel : undefined,
    tint: doc.tint === 'secondary' ? 'secondary' : 'primary',
    isHomepage: Boolean(doc.isHomepage),
    seo: seoRaw
      ? {
          metaTitle:
            typeof seoRaw.metaTitle === 'string' ? seoRaw.metaTitle : undefined,
          metaDescription:
            typeof seoRaw.metaDescription === 'string'
              ? seoRaw.metaDescription
              : undefined,
          metaImage,
        }
      : undefined,
    blocks: asBlocks(doc.blocks),
  };
};

const mapNavigationItems = (items: unknown[]): MainNavigationItem[] =>
  (Array.isArray(items) ? items : []).map((item, index) => {
    const obj = isObject<UnknownRecord>(item) ? item : {};

    return {
      id:
        typeof obj.id === 'string'
          ? obj.id
          : `main-navigation-${index.toString()}`,
      page: obj.page as MainNavigationItem['page'],
      labelOverride:
        typeof obj.labelOverride === 'string' ? obj.labelOverride : undefined,
    } satisfies MainNavigationItem;
  });

const mapCourseSessions = (doc: unknown): CourseSessions =>
  doc as CourseSessions;

const getClient = (): Promise<Payload> => getPayloadClient();

export const getHomepage = cache(async (): Promise<Page | null> => {
  const payload = await getClient();

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      isHomepage: { equals: true },
    },
    depth: PAGE_DEPTH,
    limit: 1,
  });

  if (!docs?.length) {
    return null;
  }

  return mapPage(docs[0]);
});

export const getPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    const payload = await getClient();

    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
      },
      depth: PAGE_DEPTH,
      limit: 1,
    });

    if (!docs?.length) {
      return null;
    }

    return mapPage(docs[0]);
  },
);

export const listPages = cache(async (): Promise<Page[]> => {
  const payload = await getClient();

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 100,
  });

  return (docs ?? []).map(mapPage);
});

export const getMainNavigation = cache(
  async (): Promise<MainNavigationItem[]> => {
    const payload = await getClient();

    const global = await payload.findGlobal({
      slug: 'mainNavigation',
      depth: 2,
    });

    const items =
      isObject<{ items?: unknown }>(global) && Array.isArray(global.items)
        ? (global.items as unknown[])
        : [];

    return mapNavigationItems(items);
  },
);

export interface NavigationEntry {
  id: string;
  href: string;
  label: string;
  tint: Page['tint'];
  page: Page | null;
}

const resolvePageReference = (
  ref: MainNavigationItem['page'],
  pageById: Map<string, Page>,
  pageBySlug: Map<string, Page>,
): Page | null => {
  if (!ref) {
    return null;
  }

  const fromUnknown = (value: unknown): Page | null => {
    if (!value) {
      return null;
    }

    if (isObject<Page>(value) && typeof value.slug === 'string') {
      return value;
    }

    if (isObject<{ value?: unknown }>(value)) {
      return fromUnknown(value.value);
    }

    if (isObject<{ id?: unknown; slug?: unknown }>(value)) {
      const rawId = value.id;
      if (typeof rawId === 'string' || typeof rawId === 'number') {
        const id = String(rawId);
        return pageById.get(id) ?? null;
      }

      const rawSlug = value.slug;
      if (typeof rawSlug === 'string') {
        return pageBySlug.get(rawSlug) ?? null;
      }
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const asString = String(value);
      return pageById.get(asString) ?? pageBySlug.get(asString) ?? null;
    }

    return null;
  };

  return fromUnknown(ref);
};

export const getNavigationEntries = cache(
  async (): Promise<NavigationEntry[]> => {
    const [items, pages] = await Promise.all([
      getMainNavigation(),
      listPages(),
    ]);

    const pageById = new Map<string, Page>();
    const pageBySlug = new Map<string, Page>();

    for (const page of pages) {
      pageById.set(page.id, page);
      pageBySlug.set(page.slug, page);
    }

    const entries: NavigationEntry[] = [];

    for (const item of items) {
      const page = resolvePageReference(item.page, pageById, pageBySlug);

      if (!page) {
        continue;
      }

      const label =
        (item.labelOverride && item.labelOverride.trim()) ||
        page.navigationLabel ||
        page.title;

      if (!label) {
        continue;
      }

      const isHome = page.isHomepage || page.slug === 'homepage';
      const href = isHome ? '/' : `/${page.slug}`;

      entries.push({
        id: item.id,
        href,
        label,
        tint: page.tint,
        page,
      });
    }

    return entries;
  },
);

export const getCourseSessions = cache(async (): Promise<CourseSessions[]> => {
  const payload = await getClient();

  const { docs } = await payload.find({
    collection: 'courseSessions',
    depth: 1,
    limit: 50,
  });

  return (docs ?? []).map(mapCourseSessions);
});
