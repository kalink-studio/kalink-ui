import { contacts } from './contacts/config';
import { fiftyFifty } from './fifty-fifty/config';
import { introBlock } from './intro-block/config';
import { listItems } from './list-items/config';
import { mediaBanner } from './media-banner/config';
import { servicesGrid } from './services-grid/config';
import { team } from './team/config';
import { testimonialsRow } from './testimonials-row/config';

import type { Block } from 'payload';

export const blocks: Block[] = [
  introBlock,
  mediaBanner,
  fiftyFifty,
  listItems,
  servicesGrid,
  team,
  testimonialsRow,
  contacts,
];

export type BlockSlug = (typeof blocks)[number]['slug'];
