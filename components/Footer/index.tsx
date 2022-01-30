import { Link } from 'components/Link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <p>
          Made this website in <Link href="http://nextjs.org">Next.js</Link>,
          deployed on <Link href="http://vercel.com">Vercel</Link>.
        </p>
      </div>
    </footer>
  );
};
