import { Container } from '@/app/(frontend)/components/container';
import { getNavigationEntries } from '@/lib/cms';

import { NavigationClient } from './navigation.client';
import { navigationRoot } from './navigation.css';

export async function Navigation() {
  const entries = await getNavigationEntries();

  if (entries.length === 0) {
    return null;
  }

  return (
    <header className={navigationRoot}>
      <Container size="3xl">
        <NavigationClient entries={entries} />
      </Container>
    </header>
  );
}
