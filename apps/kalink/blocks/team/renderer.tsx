import { isObject } from '@kalink-ui/dibbly';
import { Text } from '@kalink-ui/seedly';
import { clsx } from 'clsx';
import Image from 'next/image';

import { BlockHeading } from '@/app/(frontend)/components/block-heading';
import { Container } from '@/app/(frontend)/components/container';
import { RichText } from '@/app/(frontend)/components/rich-text';
import { surfaceTint } from '@/app/(frontend)/styles/tints.css';
import type { Person, TeamBlock } from '@/types/cms';
import { resolveMedia } from '@/utils/resolve-media';

import {
  teamCard,
  teamCardBody,
  teamFigure,
  teamGrid,
  teamSection,
} from './styles.css';

interface TeamProps {
  block: TeamBlock;
}

const resolvePerson = (entry: unknown): Person | null => {
  if (isObject<Person>(entry) && typeof entry.givenName === 'string') {
    return entry;
  }

  return null;
};

export function TeamSection({ block }: TeamProps) {
  return (
    <section className={teamSection({})}>
      <Container size="3xl">
        <BlockHeading title={block.title} anchor={block} as="h3" />
        <ul className={teamGrid({})}>
          {block.items.map((item) => {
            const person = resolvePerson(item.person);
            if (!person) {
              return null;
            }

            const media = person.picture ? resolveMedia(person.picture) : null;
            const tint = surfaceTint[item.backgroundTint];

            const fullName = [person.givenName, person.surname]
              .filter(Boolean)
              .join(' ');

            return (
              <li key={item.id} className={clsx(teamCard({}), tint)}>
                {media ? (
                  <div className={teamFigure()}>
                    <Image
                      src={media.url}
                      alt={media.alt || fullName}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <div className={teamCardBody()}>
                  <Text use="span" variant="headline" size="small">
                    {fullName}
                  </Text>
                  {person.jobTitle ? (
                    <Text use="span" variant="title" size="small">
                      {person.jobTitle}
                    </Text>
                  ) : null}
                  <RichText content={person.summary} />
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
