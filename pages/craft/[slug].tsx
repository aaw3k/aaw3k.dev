import type { ReactElement } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { Craft } from 'lib/types';

import { useEffect } from 'react';
import { Layout, SiteLayout } from 'components/Layouts';
import { CraftPreview } from 'components/CraftPreview';

import data from 'data/craft';

type Props = {
  params: Craft;
};

const CraftPage = ({ params }: Props) => {
  const hasDark = params.isDark ? 'true' : 'false';

  useEffect(() => {
    if (!CSS.supports('selector(:has(*))')) {
      document.documentElement.setAttribute('data-has-dark', hasDark);

      return () => {
        document.documentElement.removeAttribute('data-has-dark');
      };
    }
  }, [hasDark]);

  return (
    <Layout title={params.title} color="violet" showHeader={false}>
      <CraftPreview {...params} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data
    .filter((item) => item.slug)
    .map((item) => ({
      params: { slug: item.slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const params = data.find((item) => item.slug === slug);

  return {
    props: {
      params,
    },
  };
};

CraftPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout showNav={false} showFooter={false}>
      {page}
    </SiteLayout>
  );
};

CraftPage.theme = 'dynamic';
export default CraftPage;
