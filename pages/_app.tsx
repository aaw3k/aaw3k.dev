import 'styles/global.css';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'next-themes';
import { SiteLayout } from 'components/Layouts';
import { Analytics } from '@vercel/analytics/react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ThemeProvider defaultTheme="system">
        <SiteLayout>{page}</SiteLayout>
        <Analytics />
      </ThemeProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}
