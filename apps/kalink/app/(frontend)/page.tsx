import { notFound } from 'next/navigation';

import { Anchors } from '@/app/(frontend)/components/anchors';
import { Container } from '@/app/(frontend)/components/container';
import { RenderBlocks } from '@/blocks/render-blocks';
import { getHomepage } from '@/lib/cms';
import { getBlockAnchors } from '@/utils/get-block-anchors';

import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();

  if (!page) {
    return {};
  }

  const metaImage = page.seo?.metaImage;
  const metaImageUrl =
    metaImage && typeof metaImage === 'object' && 'url' in metaImage
      ? (metaImage.url as string | undefined)
      : undefined;

  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? undefined,
    openGraph: {
      title: page.seo?.metaTitle ?? page.title,
      description: page.seo?.metaDescription ?? undefined,
      images: metaImageUrl ? [{ url: metaImageUrl }] : undefined,
    },
  };
}

export default async function HomePage() {
  const page = await getHomepage();

  if (!page) {
    notFound();
  }

  const anchors = getBlockAnchors(page.blocks);

  return (
    <>
      <Container size="3xl">
        <Anchors anchors={anchors} />
      </Container>
      <RenderBlocks blocks={page.blocks} />
    </>
  );
}
