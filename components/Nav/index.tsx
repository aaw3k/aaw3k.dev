import { useRouter } from 'next/router';
import { ThemeSwitch } from './ThemeSwitch';

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
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};
