import { useState, useEffect } from 'react';
import { Link } from 'components/Link';
import styles from './Intro.module.css';

const KAOMOJI = ['(. ❛ ᴗ ❛.)', '( ͡• ͜ʖ ͡• )', '(◠◇◠)づ'];

const getRandomKaomoji = (preclude: string) => {
  const kaomoji = preclude
    ? KAOMOJI.filter((kaomoji) => kaomoji !== preclude)
    : KAOMOJI;

  return kaomoji[Math.trunc(kaomoji.length * Math.random())];
};

export const Intro = () => {
  const [kaomoji, setKaomoji] = useState(KAOMOJI[0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setKaomoji((kaomoji) => getRandomKaomoji(kaomoji));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.person}>
        <h1>Sławek Jaskulski</h1>
        <span>I&apos;m a clown {kaomoji}</span>
        <p>
          I'm delighted to have the chance to create user interfaces, construct
          complex software and web apps, and explore the potential of enhancing
          user interfaces with unique features.
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
