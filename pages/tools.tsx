import type { NextPage } from 'next';

import { Layout } from 'components/Layouts';
import { Section } from 'components/Section';
import { CardLink } from 'components/CardLink';

import data from 'data/tools';

const Tools: NextPage = () => {
  return (
    <Layout
      title="Tools"
      description="My favorite tools for web development, design, and productivity"
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

export default Tools;
