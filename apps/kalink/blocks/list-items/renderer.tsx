import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import { surfaceTint } from '@/app/(frontend)/styles/tints.css';
import type { ListItemsBlock } from '@/types/cms';

import { listItemsList, listItemsSection } from './styles.css';

interface ListItemsProps {
  block: ListItemsBlock;
}

export function ListItemsSection({ block }: ListItemsProps) {
  const tint = surfaceTint[block.backgroundTint];

  return (
    <section className={listItemsSection}>
      <Container size="2xl" className={tint}>
        <BlockHeading title={block.title} anchor={block} as="h3" />
        <ul className={listItemsList}>
          {block.items.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
