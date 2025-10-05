import { notFound } from 'next/navigation';

import { Anchors } from '@/app/(frontend)/components/anchors';
import { Container } from '@/app/(frontend)/components/container';
import { RenderBlocks } from '@/blocks/render-blocks';
import { getPageBySlug, listPages } from '@/lib/cms';
import type { Page } from '@/types/cms';
import { getBlockAnchors } from '@/utils/get-block-anchors';

import type { Metadata } from 'next';

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const isHomepage = (page: Page) => page.isHomepage;

export async function generateStaticParams() {
  const pages = await listPages();

  return pages
    .filter((page) => !isHomepage(page))
    .map((page) => ({
      slug: page.slug,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

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
