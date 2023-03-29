import type { NextPage } from 'next';

import { Layout } from 'components/Layouts';
import { Section } from 'components/Section';
import { CardPreview } from 'components/CardPreview';
import { convertToBase64 } from 'lib/convertToBase64';

import data from 'data/craft';

const Craft: NextPage = ({ base64Images }: any) => {
  return (
    <Layout
      title="Craft"
      description="Software development craft room for ideation and creation"
      color="violet"
    >
      <Section>
        <CardPreview.List>
          {data.map((item, index) => {
            const { slug, title, date, thumbnail } = item;
            return (
              <CardPreview.Item
                key={index}
                title={title}
                date={date}
                preload={base64Images[index]}
                thumbnail={thumbnail}
                link={slug ? `/craft/${slug}` : ''}
              />
            );
          })}
        </CardPreview.List>
      </Section>
    </Layout>
  );
};

export async function getStaticProps() {
  const dataImages = data.map((item) => item.image);
  const base64Images = await Promise.all(
    dataImages.map((image) => convertToBase64(image, 30, 16)),
  );

  return {
    props: {
      base64Images,
    },
  };
}

export default Craft;
