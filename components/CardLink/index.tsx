import { Link } from 'components/Link';
import { isExternalLink } from 'lib/utils';
import styles from './CardLink.module.css';
import Image from 'next/image';

type Props = {
  title?: string;
  description?: string;
  link: string;
  category?: string;
  icon?: {
    image: string;
    background?: string;
    invert?: boolean;
  };
};

const List = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};

const Item = ({ icon, title, description, link, category }: Props) => {
  const imageSrc = `https://res.cloudinary.com/dxayu6k1d/image/upload/c_scale,h_48/v1672082326/aaw3k.dev/${icon?.image}`;

  return (
    <Link to={link} className={styles.item}>
      <div className={icon ? styles.header : ''}>
        {icon && (
          <div
            className={styles.image}
            style={
              {
                '--i-bg': icon?.background ?? 'var(--accents-4)',
                '--i-filter': icon?.invert ? 'var(--invert)' : 'none',
              } as React.CSSProperties
            }
          >
            <Image
              src={imageSrc}
              alt={title as string}
              width={48}
              height={48}
            />
          </div>
        )}
        <div>
          <h3>{title}</h3>
          <span>{category}</span>
        </div>
      </div>
      <p>{description}</p>

      {isExternalLink(link) ? (
        <div className={styles.external}>
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="var(--accents-2)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            />
            <path
              stroke="var(--accents-2)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            />
          </svg>
        </div>
      ) : null}
    </Link>
  );
};

export const CardLink = {
  List,
  Item,
};
