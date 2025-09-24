import { isObject } from '@kalink-ui/dibbly';

import type { Block, Person, Service, ServiceDescription } from '@/types/cms';

import { slugify } from './slugify';

export interface BlockAnchor {
  id: string;
  slug: string;
  label: string;
}

interface AnchorCandidate {
  id: string;
  showInSubNavigation?: boolean;
  subNavigationLabel?: string;
  anchorSlug?: string;
}

function resolveAnchor(
  candidate: AnchorCandidate,
  fallback?: string,
): BlockAnchor | null {
  if (!candidate.showInSubNavigation) {
    return null;
  }

  const label = candidate.subNavigationLabel || fallback;
  if (!label) {
    return null;
  }

  const slug = candidate.anchorSlug || slugify(label);

  return {
    id: candidate.id,
    label,
    slug,
  };
}

function resolveServiceTitle(entry: unknown): string | undefined {
  if (isObject<Service>(entry) && typeof entry.title === 'string') {
    return entry.title;
  }

  if (isObject<ServiceDescription>(entry) && typeof entry.title === 'string') {
    return entry.title;
  }

  return undefined;
}

function resolvePersonName(entry: unknown): string | undefined {
  if (!isObject<Person>(entry)) {
    return undefined;
  }

  const parts = [entry.givenName, entry.surname].filter(
    (part): part is string => typeof part === 'string' && part.length > 0,
  );

  return parts.join(' ').trim() || undefined;
}

export const getBlockAnchors = (blocks: Block[]): BlockAnchor[] => {
  const anchors: BlockAnchor[] = [];

  for (const block of blocks) {
    switch (block.blockType) {
      case 'introBlock': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }
        break;
      }

      case 'mediaBanner': {
        const anchor = resolveAnchor(block, block.items?.[0]?.title);
        if (anchor) {
          anchors.push(anchor);
        }

        for (const item of block.items ?? []) {
          const itemAnchor = resolveAnchor(item, item.title);
          if (itemAnchor) {
            anchors.push(itemAnchor);
          }
        }
        break;
      }

      case 'fiftyFifty': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }
        break;
      }

      case 'listItems': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }
        break;
      }

      case 'servicesGrid': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }

        for (const item of block.items) {
          const title = resolveServiceTitle(item.entry);
          const itemAnchor = resolveAnchor(item, title);
          if (itemAnchor) {
            anchors.push(itemAnchor);
          }
        }
        break;
      }

      case 'team': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }

        for (const item of block.items) {
          const personName = resolvePersonName(item.person);
          const itemAnchor = resolveAnchor(item, personName);
          if (itemAnchor) {
            anchors.push(itemAnchor);
          }
        }
        break;
      }

      case 'testimonialsRow': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }
        break;
      }

      case 'contacts': {
        const anchor = resolveAnchor(block, block.title);
        if (anchor) {
          anchors.push(anchor);
        }
        break;
      }

      default:
        break;
    }
  }

  return anchors;
};
