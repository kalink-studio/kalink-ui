import { isObject } from '@kalink-ui/dibbly';
import { Stack, Text } from '@kalink-ui/seedly';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { ContactForm } from '@/app/(frontend)/components/contact-form';
import { Container } from '@/app/(frontend)/components/container';
import { MapLocator } from '@/app/(frontend)/components/map-locator';
import { RichText } from '@/app/(frontend)/components/rich-text';
import { surfaceTint } from '@/app/(frontend)/styles/tints.css';
import { getCourseSessions } from '@/lib/cms';
import type { ContactsBlock, CourseSessions } from '@/types/cms';

import {
  contactsInfo,
  contactsLayout,
  contactsSection,
  mapWrapper,
} from './styles.css';

interface ContactsProps {
  block: ContactsBlock;
}

const resolveSessions = (
  source: CourseSessions | string | null | undefined,
  sessions: CourseSessions[],
) => {
  if (isObject<CourseSessions>(source) && Array.isArray(source.items)) {
    return source;
  }

  if (typeof source === 'string') {
    return sessions.find(
      (session) => session.id === source || session.slug === source,
    );
  }

  return undefined;
};

export async function ContactsSection({ block }: ContactsProps) {
  const sessions = await getCourseSessions();
  const tint = surfaceTint[block.backgroundTint];

  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const [longitude, latitude] = block.location ?? [];

  const resolvedFields = block.formFields.map((field) => ({
    ...field,
    optionsSource: resolveSessions(field.optionsSource, sessions),
  }));

  const hasMap = Boolean(block.showMap && mapApiKey && mapId);

  return (
    <section className={contactsSection({})}>
      <Container size="3xl" className={tint}>
        <div
          className={contactsLayout({ columns: hasMap ? 'double' : 'single' })}
        >
          <div className={contactsInfo()}>
            <Stack spacing={3}>
              <BlockHeading title={block.title} anchor={block} as="h3" />
              {block.subtitle ? (
                <Text use="span" variant="title" size="small">
                  {block.subtitle}
                </Text>
              ) : null}
              <RichText content={block.information} />
            </Stack>
            {hasMap ? (
              <div className={mapWrapper()}>
                <MapLocator
                  apiKey={mapApiKey}
                  mapId={mapId}
                  latitude={typeof latitude === 'number' ? latitude : undefined}
                  longitude={
                    typeof longitude === 'number' ? longitude : undefined
                  }
                />
              </div>
            ) : null}
          </div>
          <ContactForm
            fields={resolvedFields}
            type={block.formType}
            sessions={sessions}
          />
        </div>
      </Container>
    </section>
  );
}
