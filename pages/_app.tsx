import 'styles/global.css';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'next-themes';
import { SiteLayout } from 'components/Layouts';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const interVariable = Inter();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ThemeProvider defaultTheme="system">
        <section className={interVariable.className}>
          <SiteLayout>{page}</SiteLayout>
          <Analytics />
        </section>
      </ThemeProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}
