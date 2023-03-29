import type { Craft } from 'lib/types';

import { useState, CSSProperties } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Link } from 'components/Link';
import { LoadingDots } from 'components/LoadingDots';
import { cx } from 'lib/utils';
import {
  CornerDownLeftIcon,
  GitHubIcon,
  CodePenIcon,
  StackBlitzIcon,
} from 'components/Icons';

import styles from './CraftPreview.module.css';

type IconType = 'github' | 'codepen' | 'stackblitz';

const icons = {
  github: <GitHubIcon width={18} height={18} />,
  codepen: <CodePenIcon width={18} height={18} />,
  stackblitz: <StackBlitzIcon width={18} height={18} />,
} as Record<IconType, JSX.Element>;

export const CraftPreview = ({ title, demo, isDark, links }: Craft) => {
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const movement = !shouldReduceMotion;

  const handleLoad = () => {
    setLoading(false);
  };

  const screenAnimation: Variants = {
    hidden: { opacity: 0 },
    enter: {
      opacity: loading ? 0 : 1,
      transition: { duration: movement ? 0.5 : 0 },
    },
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/craft" className={styles.link}>
          <CornerDownLeftIcon width={18} height={18} />
          Craft
        </Link>

        {links && links.length > 0
          ? links.map((link) => {
              const { name, url, icon } = link;
              const specificIcon = icons[icon as IconType];

              return (
                <Link key={url} href={url} className={styles.link}>
                  {specificIcon ? specificIcon : null}
                  {name}
                </Link>
              );
            })
          : null}
      </nav>

      {loading && (
        <div className={styles.loader}>
          <LoadingDots style={{ '--loading-size': '.5rem' } as CSSProperties} />
        </div>
      )}

      <motion.div variants={screenAnimation} initial="hidden" animate="enter">
        <iframe
          onLoad={handleLoad}
          title={title}
          src={demo}
          width="100%"
          height="100%"
          className={cx(styles.iframe, {
            dark: isDark,
            [styles.hidden]: loading,
          })}
        />
      </motion.div>
    </>
  );
};
