import Link from 'next/link';
import styles from './SnippetPost.module.css';

type Props = {
  slug: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const List = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};

const Item = ({ slug, title, description, children }: Props) => {
  return (
    <div className={styles.content}>
      <Link href={`/snippets/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <p>{description}</p>
      {children}
    </div>
  );
};

export const SnippetPost = {
  List,
  Item,
};
