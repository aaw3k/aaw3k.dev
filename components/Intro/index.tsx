import { Link } from 'components/Link';
import styles from './Intro.module.css';

export const Intro = () => {
  return (
    <div className={styles.root}>
      <div className={styles.person}>
        <h1>Sławek Jaskulski</h1>
        <span>I&apos;m a clown (. ❛ ᴗ ❛.)</span>
        <p>
          My goal is pretty simple, build great things with great people. I like
          to develop clean and interactive applications with React / Next.js.
        </p>

        <div className={styles.social}>
          <Link href="https://twitter.com/aaw3k">Twitter</Link>
          <Link href="https://codepen.io/aaw3k">CodePen</Link>
          <Link href="https://github.com/aaw3k">GitHub</Link>
        </div>
      </div>
    </div>
  );
};
