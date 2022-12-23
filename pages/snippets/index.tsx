import type { NextPage, GetStaticProps } from 'next';
import type { FrontMatter } from 'lib/types';

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllPostsMeta } from 'lib/mdx';
import { bundleMDX } from 'mdx-bundler';
import { components } from 'components/Mdx';
import { Layout } from 'components/Layouts';
import { SnippetPost } from 'components/SnippetPost';

const MDXPage = ({ code }: { code: string }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component components={{ ...components } as any} />;
};

type Props = {
  items: Array<{
    frontMatter: FrontMatter;
    mdx: any;
    code: string;
  }>;
};

const Snippets: NextPage<Props> = ({ items }) => {
  return (
    <Layout
      title="Code Snippets"
      description="That's a collection of code snippets you can copy and paste"
    >
      <SnippetPost.List>
        {items
          .sort(
            (a, b) =>
              Number(new Date(b.frontMatter.date)) -
              Number(new Date(a.frontMatter.date)),
          )
          .map((entry, i) => {
            const { slug, title, description } = entry.frontMatter;
            const source = entry.code;
            return (
              <SnippetPost.Item
                key={i}
                slug={slug}
                title={title}
                description={description}
              >
                <MDXPage code={source} />
              </SnippetPost.Item>
            );
          })}
      </SnippetPost.List>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mdxFiles = getAllPostsMeta('snippets');

  async function serializeMdxFile(item: { frontMatter: any; content: string }) {
    const { frontMatter, content } = item;
    const { code } = await bundleMDX({
      source: content,
    });

    return {
      frontMatter,
      code,
    };
  }

  return {
    props: {
      items: await Promise.all(mdxFiles.map((f) => serializeMdxFile(f))),
    },
  };
};

export default Snippets;
