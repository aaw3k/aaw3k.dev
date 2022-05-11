import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Tooltip } from 'components/Tooltip';
import { motion } from 'framer-motion';
import { variants } from './variants';

import styles from './Nav.module.css';

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const theme = mounted && resolvedTheme === 'dark';
  const variant = theme ? variants.light : variants.dark;

  useEffect(() => setMounted(true), []);

  return (
    <Tooltip label={theme ? 'Light mode' : 'Dark mode'}>
      <button
        className={styles.themeSwitch}
        aria-label={theme ? 'Light mode' : 'Dark mode'}
        onClick={() => setTheme(theme ? 'light' : 'dark')}
      >
        <svg
          className={styles.sunAndMoon}
          aria-hidden={true}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <defs>
            <clipPath id="moon-mask">
              <motion.circle
                key={mounted ? 'light' : 'dark'}
                className={styles.mask}
                cx={12}
                cy={12}
                r={6}
                initial="mask"
                animate="mask"
                variants={variant}
              ></motion.circle>
            </clipPath>
          </defs>

          <motion.g
            key={mounted ? 'light' : 'dark'}
            clipPath="url(#moon-mask)"
            style={{ filter: 'drop-shadow(0 0 0 black)' }}
          >
            <motion.circle
              className={styles.sun}
              cx={12}
              cy={12}
              r={5}
              initial="sun"
              animate="sun"
              variants={variant}
            ></motion.circle>
            <motion.circle
              className={styles.moon}
              cx={33}
              cy={7}
              r={7}
              initial="moon"
              animate="moon"
              variants={variant}
            ></motion.circle>
          </motion.g>

          <motion.g
            key={mounted ? 'sun' : 'moon'}
            initial="sunBeams"
            animate="sunBeams"
            variants={variant}
            className={styles.sunBeams}
            stroke="currentColor"
          >
            <line x1={12} y1={1} x2={12} y2={3} />
            <line x1={12} y1={21} x2={12} y2={23} />
            <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
            <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
            <line x1={1} y1={12} x2={3} y2={12} />
            <line x1={21} y1={12} x2={23} y2={12} />
            <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
            <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
          </motion.g>
        </svg>
      </button>
    </Tooltip>
  );
};
