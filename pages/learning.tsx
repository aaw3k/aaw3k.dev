import type { NextPage } from 'next';

import { Layout } from 'components/Layouts';
import { Section } from 'components/Section';
import { CardLink } from 'components/CardLink';

import data from 'data/learning';

const Learning: NextPage = () => {
  return (
    <Layout
      title="Learning"
      description="My go-to links when it comes to resources, inspiration and tools."
      color="green"
    >
      <Section>
        <CardLink.List>
          {data.map((item, i) => {
            const { name, text, category, url } = item;
            return (
              <CardLink.Item
                key={i}
                title={name}
                text={text}
                category={category}
                link={url}
              />
            );
          })}
        </CardLink.List>
      </Section>
    </Layout>
  );
};

export default Learning;
