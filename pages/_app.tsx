import 'styles/global.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { SiteLayout } from 'components/Layouts';
import { Providers } from 'components/Providers';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  theme?: 'light' | 'dark' | 'dynamic';
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Providers forcedTheme={Component.theme} {...pageProps}>
        <SiteLayout>{page}</SiteLayout>
      </Providers>
    ));

  return getLayout(
    <Providers forcedTheme={Component.theme} {...pageProps}>
      <Component {...pageProps} />
    </Providers>,
  );
}
