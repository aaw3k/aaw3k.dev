import 'styles/global.css';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'next-themes';
import { SiteLayout } from 'components/Layouts';

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
      <ThemeProvider defaultTheme="light">
        <SiteLayout>{page}</SiteLayout>
      </ThemeProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}
