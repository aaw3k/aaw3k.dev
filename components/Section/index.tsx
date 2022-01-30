import styles from './Section.module.css';

type Props = {
  heading?: string;
  description?: string;
  children?: React.ReactNode;
};

export const Section = ({ heading, description, children }: Props) => {
  return (
    <section className={styles.root}>
      {heading && (
        <header className={styles.heading}>
          <h2>{heading}</h2>
          {description && <p>{description}</p>}
        </header>
      )}

      {children}
    </section>
  );
};
