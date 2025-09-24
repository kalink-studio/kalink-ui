import type {
  Block,
  BlockType,
  ContactsBlock,
  FiftyFiftyBlock,
  IntroBlock,
  ListItemsBlock,
  MediaBannerBlock,
  ServicesGridBlock,
  TeamBlock,
  TestimonialsRowBlock,
} from '@/types/cms';

import { ContactsSection } from './contacts/renderer';
import { FiftyFiftySection } from './fifty-fifty/renderer';
import { IntroBlockSection } from './intro-block/renderer';
import { ListItemsSection } from './list-items/renderer';
import { MediaBannerSection } from './media-banner/renderer';
import { ServicesGridSection } from './services-grid/renderer';
import { TeamSection } from './team/renderer';
import { TestimonialsRowSection } from './testimonials-row/renderer';

import type { ReactElement } from 'react';

type BlockRendererResult = ReactElement | null | Promise<ReactElement | null>;

type BlockRendererFunction = (block: Block) => BlockRendererResult;

export const blockComponents: Record<BlockType, BlockRendererFunction> = {
  introBlock: (block) => IntroBlockSection({ block: block as IntroBlock }),
  mediaBanner: (block) =>
    MediaBannerSection({ block: block as MediaBannerBlock }),
  fiftyFifty: (block) => FiftyFiftySection({ block: block as FiftyFiftyBlock }),
  listItems: (block) => ListItemsSection({ block: block as ListItemsBlock }),
  servicesGrid: (block) =>
    ServicesGridSection({ block: block as ServicesGridBlock }),
  team: (block) => TeamSection({ block: block as TeamBlock }),
  testimonialsRow: (block) =>
    TestimonialsRowSection({ block: block as TestimonialsRowBlock }),
  contacts: (block) => ContactsSection({ block: block as ContactsBlock }),
};

export type BlockRenderer = BlockRendererFunction;
