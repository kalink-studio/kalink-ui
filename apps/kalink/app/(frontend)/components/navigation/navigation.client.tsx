'use client';

import {
  ButtonIcon,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@kalink-ui/seedly';
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
        <Sheet>
          <SheetTrigger asChild>
            <ButtonIcon
              variant="ghost"
              size="sm"
              label="Ouvrir le menu de navigation"
            >
              <Menu size={20} />
            </ButtonIcon>
          </SheetTrigger>
          <SheetContent side="right" size="md">
            <div className={mobileMenuHeader}>
              <SheetTitle use="h3">Menu</SheetTitle>
              <SheetClose asChild>
                <ButtonIcon variant="ghost" size="sm" label="Fermer le menu">
                  <X size={20} />
                </ButtonIcon>
              </SheetClose>
            </div>
            <nav className={mobileMenuContent} aria-label="Navigation mobile">
              {entries.map((entry) => (
                <SheetClose asChild key={entry.id}>
                  <Link href={entry.href} className={mobileMenuItem}>
                    {entry.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
