import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Tooltip } from 'components/Tooltip';

import NextLink from 'next/link';
import Image from 'next/image';

import styles from './Nav.module.css';

const navData = [
  {
    name: 'Work',
    path: '/work',
  },
  {
    name: 'Snippets',
    path: '/snippets',
  },
  {
    name: 'Learning',
    path: '/learning',
  },
];

const NavItem = ({ href, text }: { href: string; text: string }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a className={isActive ? styles.active : ''}>{text}</a>
    </NextLink>
  );
};

export const Nav = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <nav className={styles.root}>
      <div className={styles.container}>
        <div className={styles.skip}>
          <a href="#skip">Skip to main content</a>
        </div>

        <div className={styles.avatar}>
          <NextLink href="/">
            <a>
              <Image
                src={'/static/images/avatar.jpg'}
                alt={'Picture of the author'}
                width={48}
                height={48}
                priority={true}
              />
            </a>
          </NextLink>
        </div>

        <div className={styles.menu}>
          <div className={styles.scrollSnapX}>
            {navData.map((item, i) => {
              const { path, name } = item;
              return <NavItem key={i} href={path} text={name} />;
            })}
          </div>

          <div>
            <Tooltip
              label={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
              shortcut={resolvedTheme === 'dark' ? ['L'] : ['D']}
            >
              <button
                type="button"
                aria-label="Toggle Dark Mode"
                className={styles.toggle}
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
              >
                {mounted && (
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {resolvedTheme === 'dark' ? (
                      <path
                        stroke="var(--accents-2)"
                        strokeWidth={1.7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 12.12A7.784 7.784 0 016.472 6.46 7.776 7.776 0 016.876 2a7.784 7.784 0 00-4.735 8.695A7.781 7.781 0 0017 12.12z"
                      />
                    ) : (
                      <path
                        stroke="var(--accents-2)"
                        strokeWidth={1.7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 14a4 4 0 100-8 4 4 0 000 8zM1 10h1M3.5 3.5l1 1M10 1v1M16.5 3.5l-1 1M19 10h-1M16.5 16.5l-1-1M10 19v-1M3.5 16.5l1-1"
                      />
                    )}
                  </svg>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
};
