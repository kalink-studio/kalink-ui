import { Button, Cluster, Stack } from '@kalink-ui/seedly';
import { clsx } from 'clsx';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import { RichText } from '@/app/(frontend)/components/rich-text';
import { surfaceTint } from '@/app/(frontend)/styles/tints.css';
import type { IntroBlock } from '@/types/cms';
import { resolveMedia } from '@/utils/resolve-media';

import { introSection } from './styles.css';

type IntroCta = NonNullable<IntroBlock['ctas']>[number];

const ctaVariantMap: Record<
  IntroCta['variant'],
  'plain' | 'outline' | 'ghost' | 'bare'
> = {
  filled: 'plain',
  outlined: 'outline',
  ghost: 'ghost',
  bare: 'bare',
};

interface IntroBlockProps {
  block: IntroBlock;
}

export function IntroBlockSection({ block }: IntroBlockProps) {
  const tintClass = surfaceTint[block.backgroundTint];
  const ctas: IntroCta[] = Array.isArray(block.ctas) ? block.ctas : [];

  return (
    <section className={clsx(introSection, tintClass)}>
      <Container size="3xl">
        <Stack spacing={6} align="start">
          <BlockHeading title={block.title} anchor={block} />
          <RichText content={block.body} />
          {ctas.length > 0 ? (
            <Cluster spacing={4}>
              {ctas.map((cta) => {
                const media = resolveMedia(cta.media);
                if (!media) {
                  return null;
                }

                return (
                  <Button
                    key={cta.id ?? cta.label}
                    use="a"
                    href={media.url}
                    variant={ctaVariantMap[cta.variant]}
                    target="_blank"
                    rel="noreferrer"
                    size="md"
                  >
                    {cta.label}
                  </Button>
                );
              })}
            </Cluster>
          ) : null}
        </Stack>
      </Container>
    </section>
  );
}
