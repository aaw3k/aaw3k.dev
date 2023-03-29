import Image from 'next/image';
import { Link } from 'components/Link';
import { formatDate } from 'lib/utils';
import { isEmptyLink } from 'lib/utils';

import styles from './CardPreview.module.css';

type Props = {
  link: string;
  preload?: string;
  thumbnail?: string;
  title: string;
  date: string;
};

const fileFormats = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'],
  video: ['mp4', 'webm', 'mov', 'ogg'],
};

const List = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};

const Item = ({ preload, title, date, link, thumbnail }: Props) => {
  const { image, video } = fileFormats;

  const extension = thumbnail?.slice(thumbnail.lastIndexOf('.') + 1) || '';
  const cleanDate = formatDate({
    timestamp: date,
    month: 'short',
  }).formatted;

  return (
    <Link to={link} className={styles.item}>
      <div className={styles.thumbnail}>
        {preload && (
          <picture>
            <img src={preload} alt={title} className={styles.preload} />
          </picture>
        )}
        {video.includes(extension) && (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={thumbnail}
            className={styles.source}
          />
        )}
        {image.includes(extension) && (
          <Image
            src={thumbnail || ''}
            alt={title || ''}
            className={styles.source}
            quality={100}
            width={1200}
            height={675}
          />
        )}
      </div>

      <div className={styles.header}>
        <p>
          {title}
          {isEmptyLink(link) ? <span>┛</span> : null}
        </p>
        <span>
          <time dateTime={cleanDate}>{cleanDate.replace(/ \d+,/, ',')}</time>
        </span>
      </div>
    </Link>
  );
};

export const CardPreview = {
  List,
  Item,
};
