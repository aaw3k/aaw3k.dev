import type { NextPage } from 'next';

import { Layout } from 'components/Layouts';
import { Section } from 'components/Section';
import { Entry } from 'components/Entry';

import data from 'data/work';

const Work: NextPage = () => {
  return (
    <Layout
      title="Work"
      description="Some things I've done in the past."
      color="red"
    >
      <Section>
        {data.map((item, i) => {
          const { name, thumbnail, description, technology, url } = item;
          return (
            <Entry
              key={i}
              title={name}
              image={thumbnail}
              text={description}
              meta={technology}
              link={url}
            />
          );
        })}
      </Section>
    </Layout>
  );
};

export default Work;
