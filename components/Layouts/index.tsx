import Head from 'next/head';
import { useEffect } from 'react';
import { Nav } from 'components/Nav';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

import styles from './Layouts.module.css';

type Props = {
  title?: string;
  description?: string;
  color?: keyof typeof colors;
  showHeader?: boolean;
  children?: React.ReactNode;
};

type variants = {
  [key: string]: string;
};

const colors: variants = {
  gray: 'var(--foreground)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  red: 'var(--red)',
  violet: 'var(--violet)',
};

const meta = {
  title: 'Sławek Jaskulski',
  description: 'Crafting interfaces',
};

export function SiteLayout({
  children,
  showNav = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}) {
  return (
    <div className={styles.root}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="og:description" content={meta.description} />

        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <div className={styles.background}>
        <div className={styles.gradient} />
      </div>

      {showNav && <Nav />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
}

export function Layout({
  title,
  description,
  color = 'blue',
  showHeader = true,
  children,
}: Props) {
  const metaTitle = title ? `${title} - Sławek Jaskulski` : '';
  const metaDescription = description ? description : '';

  useEffect(() => {
    document.documentElement.style.setProperty('--r-color', colors[color]);
  });

  return (
    <>
      {title && (
        <Head>
          <title>{metaTitle}</title>
          <meta name="og:title" content={metaTitle} />
          <meta name="description" content={metaDescription} />
          <meta name="og:description" content={metaDescription} />
        </Head>
      )}

      {showHeader && <Header title={title} description={metaDescription} />}
      <main className={styles.main} id="skip">
        {children}
      </main>
    </>
  );
}
