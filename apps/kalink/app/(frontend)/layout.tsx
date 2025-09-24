import '@kalink-ui/seedly/styles/layers';
import '@kalink-ui/seedly/styles/reset';

import { clsx } from 'clsx';

import { fontClass } from '@/styles/font';
import { themeClass } from '@/styles/theme.css';

import { Footer } from './components/footer';
import { Navigation } from './components/navigation';
import { body, html, main, skipLink } from './layout.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'Studio de création KalinK — branding, web et design.',
  title: {
    default: 'KalinK Studio',
    template: '%s · KalinK Studio',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

console.log(process.env.DATABASE_URL, process.env.PAYLOAD_SECRET);

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={clsx(html, fontClass)}>
      <body className={clsx(body, themeClass)}>
        <a href="#main-content" className={skipLink}>
          Aller au contenu principal
        </a>
        <Navigation />
        <main id="main-content" className={main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
