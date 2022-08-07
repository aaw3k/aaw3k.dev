import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { FrontMatter } from 'lib/types';
import { ParsedUrlQuery } from 'querystring';

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllPostsMeta, getPostBySlug, snippetsPath } from 'lib/mdx';
import { bundleMDX } from 'mdx-bundler';
import { Layout } from 'components/Layouts';
import { Prose } from 'components/Prose';
import { components } from 'components/Mdx';

type Props = {
  frontMatter: FrontMatter;
  code: any;
};

interface ContextProps extends ParsedUrlQuery {
  slug: string;
}

const SnippetPage = ({ code, frontMatter }: Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout {...frontMatter}>
      <Prose>
        <Component components={{ ...components } as any} />
      </Prose>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const mdxFiles = getAllPostsMeta('snippets');

  return {
    paths: mdxFiles.map((file) => ({
      params: { slug: file.frontMatter.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as ContextProps;
  const { frontMatter, content } = getPostBySlug(snippetsPath, `${slug}.mdx`);

  const { code } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? [])];

      return options;
    },
    esbuildOptions(options) {
      options.target = 'esnext';
      return options;
    },
  });

  return {
    props: {
      frontMatter,
      code,
    },
  };
};

export default SnippetPage;
