import { Fragment } from 'react';

import type { Block } from '@/types/cms';

import { blockComponents } from './renderers';

interface RenderBlocksProps {
  blocks?: Block[] | null;
}

export async function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const rendered = await Promise.all(
    blocks.map(async (block) => {
      const render = blockComponents[block.blockType];

      if (!render) {
        return null;
      }

      const element = await render(block);
      if (!element) {
        return null;
      }

      return { id: block.id, element };
    }),
  );

  return rendered.map((item, index) =>
    item ? <Fragment key={item.id ?? index}>{item.element}</Fragment> : null,
  );
}
