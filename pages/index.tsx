import type { NextPage } from 'next';

import { Layout } from 'components/Layouts';
import { Intro } from 'components/Intro';
import { Section } from 'components/Section';
import { Entry } from 'components/Entry';
import { formatDate } from 'lib/utils';

import work from 'data/work';
import snippets from 'data/snippets';

const Home: NextPage = () => {
  return (
    <Layout>
      <Intro />

      <Section
        heading="Work"
        description="Some things I have done in the past."
      >
        {work.map((item, i) => {
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

      <Section
        heading="Snippets"
        description="This is a collection of code snippets that can be copied and pasted."
      >
        {snippets
          .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
          .map((item, i) => {
            const { title, date, description, tags, slug } = item;
            const cleanDate = formatDate({
              timestamp: date,
              month: 'short',
            }).formatted;

            return (
              <Entry
                key={i}
                link={`/snippets/${slug}`}
                title={title}
                text={description}
                meta={[tags, cleanDate]}
              />
            );
          })}
      </Section>
    </Layout>
  );
};

export default Home;
