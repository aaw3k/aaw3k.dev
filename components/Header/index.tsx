import styles from './Header.module.css';

type Props = {
  title?: string;
  description?: string;
};

export const Header = ({ title, description }: Props) => {
  if (!title) return null;
  return (
    <header className={styles.root}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
};
