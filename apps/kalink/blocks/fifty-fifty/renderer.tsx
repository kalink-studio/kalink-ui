import Image from 'next/image';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import { RichText } from '@/app/(frontend)/components/rich-text';
import { surfaceTint } from '@/app/(frontend)/styles/tints.css';
import type { FiftyFiftyBlock } from '@/types/cms';
import { resolveMedia } from '@/utils/resolve-media';

import {
  fiftyFiftyContent,
  fiftyFiftyLayout,
  fiftyFiftyMedia,
  fiftyFiftySection,
} from './styles.css';

interface FiftyFiftyProps {
  block: FiftyFiftyBlock;
}

export function FiftyFiftySection({ block }: FiftyFiftyProps) {
  const media = resolveMedia(block.image);
  const tint = surfaceTint[block.backgroundTint];

  return (
    <section className={fiftyFiftySection({})}>
      <Container size="3xl" className={tint}>
        <div className={fiftyFiftyLayout({ direction: block.direction })}>
          <div className={fiftyFiftyContent()}>
            <BlockHeading title={block.title} anchor={block} as="h3" />
            <RichText content={block.body} />
          </div>
          {media ? (
            <div className={fiftyFiftyMedia()}>
              <Image
                src={media.url}
                alt={media.alt || block.title}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
