import { Metadata } from 'next';
import { ReactNode } from 'react';

import '@kalink-ui/seedly/styles/reset';
import '@kalink-ui/seedly/styles/layers';

import '../style/fonts.css';
import '../style/refs-theme.css';
import '../style/system-theme.css';

export const metadata: Metadata = {
  title: 'Kalink UI',
  description: 'Yet another UI library, but different',
  keywords: 'kalink, ui, component, library, design, system, react',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
