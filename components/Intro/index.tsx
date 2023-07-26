import { useState, useEffect } from 'react';
import { Link } from 'components/Link';
import { GitHubIcon, CodePenIcon, TwitterIcon, XIcon } from 'components/Icons';
import styles from './Intro.module.css';

const KAOMOJI = ['(. ❛ ᴗ ❛.)', '( ͡• ͜ʖ ͡• )', '(◠◇◠)づ'];

const getRandomKaomoji = (preclude: string) => {
  const kaomoji = preclude
    ? KAOMOJI.filter((kaomoji) => kaomoji !== preclude)
    : KAOMOJI;

  return kaomoji[Math.trunc(kaomoji.length * Math.random())];
};

export const Intro = () => {
  const [hovered, setHovered] = useState(false);
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
          Creating interactive and immersive software with a focus on detail and
          utilizing cutting-edge design techniques.
        </p>

        <div className={styles.social}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <Link href="https://twitter.com/aaw3k">
              {hovered ? (
                <XIcon width={24} height={24} />
              ) : (
                <TwitterIcon width={24} height={24} />
              )}
            </Link>
          </div>
          <div aria-hidden="true" className={styles.line}></div>
          <Link href="https://codepen.io/aaw3k">
            <CodePenIcon width={24} height={24} />
          </Link>
          <div aria-hidden="true" className={styles.line}></div>
          <Link href="https://github.com/aaw3k">
            <GitHubIcon width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};
