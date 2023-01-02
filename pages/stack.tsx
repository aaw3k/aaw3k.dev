import type { NextPage } from 'next';

import { Layout } from 'components/Layouts';
import { Section } from 'components/Section';
import { CardLink } from 'components/CardLink';

import data from 'data/stack';

const Stack: NextPage = () => {
  return (
    <Layout
      title="Stack"
      description="My favorite tools and software I use daily"
      color="green"
    >
      <Section>
        <CardLink.List>
          {data.map((item) => {
            const { icon, name, description, category, url } = item;
            return (
              <CardLink.Item
                icon={icon}
                key={url}
                title={name}
                description={description}
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

export default Stack;
