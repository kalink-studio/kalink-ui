import { Stack, Text } from '@kalink-ui/seedly';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '../container';
import type { Tint } from '@/types/cms';

import { footer, socialList } from './footer.css';

export interface FooterProps {
  tint?: Extract<Tint, 'primary' | 'secondary'>;
}

export function Footer({ tint = 'primary' }: FooterProps) {
  return (
    <footer className={footer({ tint })}>
      <Container size="3xl">
        <Stack spacing={4} align="center">
          <Stack align="center" spacing={1}>
            <Text use="span" variant="headline" size="small">
              KalinK Studio ©{new Date().getFullYear()}
            </Text>
            <Text use="span" variant="body" size="medium">
              Bureau de communication
            </Text>
          </Stack>
          <div className={socialList}>
            <Link
              href="https://www.instagram.com/kalinkstudio/"
              target="_blank"
              aria-label="Instagram Kalink"
            >
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/kalink-studio/"
              target="_blank"
              aria-label="LinkedIn Kalink"
            >
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}
