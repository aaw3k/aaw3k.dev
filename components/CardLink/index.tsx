import { Link } from 'components/Link';
import { isExternalLink } from 'lib/utils';
import styles from './CardLink.module.css';

type Props = {
  link: string;
  title?: string;
  text?: string;
  category?: string;
};

const List = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};

const Item = ({ title, text, link, category }: Props) => {
  return (
    <Link to={link} className={styles.item}>
      <h3>{title}</h3>
      <span>{category}</span>
      <p>{text}</p>

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
