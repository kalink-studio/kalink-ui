'use client';

import { Drawer } from '@kalink-ui/seedly-react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationEntry } from '@/lib/cms';

import {
  brand,
  brandMark,
  brandText,
  desktopNav,
  mobileControls,
  mobileMenuContent,
  mobileMenuHeader,
  mobileMenuItem,
  navLink,
  navList,
  navigationInner,
} from './navigation.css';

interface NavigationClientProps {
  entries: NavigationEntry[];
}

const isActiveHref = (href: string, pathname: string) => {
  if (href === '/') {
    return pathname === '/' || pathname === '';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export function NavigationClient({ entries }: NavigationClientProps) {
  const pathname = usePathname();

  return (
    <div className={navigationInner}>
      <Link href="/" className={brand}>
        <Image
          src="/kalink.svg"
          alt="Kalink"
          width={40}
          height={40}
          className={brandMark}
        />
        <span className={brandText}>KalinK Studio</span>
      </Link>

      <nav className={desktopNav} aria-label="Navigation principale">
        <div className={navList}>
          {entries.map((entry) => {
            const active = isActiveHref(entry.href, pathname);

            return (
              <Link
                key={entry.id}
                href={entry.href}
                className={navLink[active ? 'active' : 'default']}
              >
                {entry.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className={mobileControls}>
        <Drawer.Root swipeDirection="right">
          <Drawer.Trigger
            variant="ghost"
            size="sm"
            icon={<Menu size={20} />}
            aria-label="Ouvrir le menu de navigation"
          />
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Content>
                  <div className={mobileMenuHeader}>
                    <Drawer.Title render={<h3 />}>Menu</Drawer.Title>
                    <Drawer.Close
                      variant="ghost"
                      size="sm"
                      icon={<X size={20} />}
                      aria-label="Fermer le menu"
                    />
                  </div>
                  <nav
                    className={mobileMenuContent}
                    aria-label="Navigation mobile"
                  >
                    {entries.map((entry) => (
                      <Drawer.Close
                        key={entry.id}
                        variant="bare"
                        nativeButton={false}
                        render={
                          <Link href={entry.href} className={mobileMenuItem} />
                        }
                      >
                        {entry.label}
                      </Drawer.Close>
                    ))}
                  </nav>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
