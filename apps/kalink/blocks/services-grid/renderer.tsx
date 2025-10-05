import { isObject } from '@kalink-ui/dibbly';
import { Text } from '@kalink-ui/seedly';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import type {
  Service,
  ServiceDescription,
  ServicesGridBlock,
} from '@/types/cms';

import {
  servicesGridCard,
  servicesGridList,
  servicesGridSection,
} from './styles.css';

interface ServicesGridProps {
  block: ServicesGridBlock;
}

const resolveEntry = (
  entry: Service | ServiceDescription | string | null | undefined,
): { title: string; description?: string } | null => {
  if (isObject<Service>(entry) && typeof entry.title === 'string') {
    return {
      title: entry.title,
    };
  }

  if (isObject<ServiceDescription>(entry) && typeof entry.title === 'string') {
    return {
      title: entry.title,
      description: entry.description,
    };
  }

  return null;
};

export function ServicesGridSection({ block }: ServicesGridProps) {
  return (
    <section className={servicesGridSection}>
      <Container size="3xl">
        <BlockHeading title={block.title} anchor={block} as="h3" />
        <ul className={servicesGridList}>
          {block.items.map((item) => {
            const resolved = resolveEntry(item.entry);
            if (!resolved) {
              return null;
            }

            return (
              <li key={item.id} className={servicesGridCard}>
                <Text use="span" variant="headline" size="small">
                  {resolved.title}
                </Text>
                {resolved.description ? (
                  <Text use="p" variant="body" size="medium">
                    {resolved.description}
                  </Text>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
