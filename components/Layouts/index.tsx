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
};

const meta = {
  title: 'Sławek Jaskulski - Front-end Developer.',
  description: 'I’m a developer, occasional gamer, definitely not a writer.',
};

export function SiteLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="og:description" content={meta.description} />

        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <div className={styles.background} />
      <Nav />

      <main className={styles.main} id="skip">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export function Layout({
  title,
  description,
  children,
  color = 'blue',
}: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty('--r-color', colors[color]);
  });

  return (
    <>
      {title && (
        <Head>
          <title>
            {title ? `${title} - ` : ''}
            Sławek Jaskulski
          </title>
          <meta
            name="og:title"
            content={`${title ? `${title} - ` : ''}Sławek Jaskulski`}
          />
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
        </Head>
      )}

      <Header title={title} description={description} />

      {children}
    </>
  );
}
