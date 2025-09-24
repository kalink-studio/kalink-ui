import { isObject } from '@kalink-ui/dibbly';
import { Text } from '@kalink-ui/seedly';
import { clsx } from 'clsx';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import { surfaceTint } from '@/app/(frontend)/styles/tints.css';
import type { Testimonial, TestimonialsRowBlock } from '@/types/cms';

import {
  testimonialCard,
  testimonialsGrid,
  testimonialsSection,
} from './styles.css';

interface TestimonialsRowProps {
  block: TestimonialsRowBlock;
}

const resolveTestimonial = (entry: unknown): Testimonial | null => {
  if (isObject<Testimonial>(entry) && typeof entry.text === 'string') {
    return entry;
  }

  return null;
};

export function TestimonialsRowSection({ block }: TestimonialsRowProps) {
  return (
    <section className={testimonialsSection({})}>
      <Container size="3xl">
        <BlockHeading title={block.title} anchor={block} as="h3" />
        <div className={testimonialsGrid({})}>
          {block.items.map((item) => {
            const testimonial = resolveTestimonial(item.testimonial);
            if (!testimonial) {
              return null;
            }

            const tint = surfaceTint[item.tintScheme];

            return (
              <article
                key={item.id}
                className={clsx(testimonialCard({}), tint)}
              >
                <Text use="blockquote" variant="body" size="medium">
                  “{testimonial.text}”
                </Text>
                <Text use="span" variant="title" size="small">
                  {testimonial.givenName}
                </Text>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
