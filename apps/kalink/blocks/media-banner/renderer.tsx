import { Stack } from '@kalink-ui/seedly';
import Image from 'next/image';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import { RichText } from '@/app/(frontend)/components/rich-text';
import type { MediaBannerBlock } from '@/types/cms';
import { resolveMedia } from '@/utils/resolve-media';

import {
  mediaBannerFigure,
  mediaBannerItem,
  mediaBannerSection,
  mediaBannerText,
} from './styles.css';

interface MediaBannerProps {
  block: MediaBannerBlock;
}

export function MediaBannerSection({ block }: MediaBannerProps) {
  return (
    <section className={mediaBannerSection()}>
      <Container size="3xl">
        <Stack spacing={block.items.length > 1 ? 6 : 4}>
          {block.items.map((item) => {
            const media = resolveMedia(item.image);

            return (
              <div
                key={item.id}
                className={mediaBannerItem({ direction: item.direction })}
              >
                <div className={mediaBannerText()}>
                  {item.title ? (
                    <BlockHeading title={item.title} anchor={item} as="h3" />
                  ) : null}
                  <RichText content={item.body} />
                </div>
                {media ? (
                  <div className={mediaBannerFigure()}>
                    <Image
                      src={media.url}
                      alt={media.alt || item.title}
                      width={1280}
                      height={800}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </Stack>
      </Container>
    </section>
  );
}
