//@ts-nocheck
import { Children, useState, useCallback, useEffect } from 'react';
import { theme } from 'lib/prism';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';

import styles from './Code.module.css';

const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`);

  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {}),
  );
};

const calculateLinesToHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)![1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (i: number) => lineNumbers.includes(i + 1);
  } else {
    return () => false;
  }
};

const getCodeData = (children) => {
  const arrayChildren = Children.toArray(children);
  const child = arrayChildren[0];

  if (child) {
    return {
      source: child.props.children.trim(),
      className: child.props.className,
    };
  }

  return {};
};

const useCodeToClipboard = (
  code: string,
  notifyTimeout = 2000,
): [CopyStatus, () => void] => {
  const [copyStatus, setCopyStatus] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => setCopyStatus(true));
  }, [code]);

  useEffect(() => {
    if (copyStatus === false) {
      return;
    }

    const timeoutId = setTimeout(() => setCopyStatus(false), notifyTimeout);

    return () => clearTimeout(timeoutId);
  }, [copyStatus, notifyTimeout]);

  return [copyStatus, copy];
};

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

export function Code({ children }: { children?: React.ReactNode }) {
  const { source, className } = getCodeData(children);
  const [language, { bg = `` }] = getParams(className);
  const [isCopied, setCopied] = useCodeToClipboard(source);

  const shouldHighlightLine = calculateLinesToHighlight(bg);
  const shouldReduceMotion = useReducedMotion();

  const iconCheck: Variants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  return (
    <div className={styles.root}>
      <button onClick={setCopied}>
        <span className={isCopied ? styles.active : (null as any)}>
          <AnimatePresence exitBeforeEnter>
            <motion.svg
              key={isCopied ? 'copied' : 'empty'}
              fill="none"
              width={16}
              height={16}
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {isCopied ? (
                <motion.path
                  d="M2 8l4 4 8-8"
                  stroke="var(--green)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={iconCheck}
                  initial="hidden"
                  animate="visible"
                />
              ) : (
                <motion.path
                  d="M10 3V2a1 1 0 00-1-1H2a1 1 0 00-1 1v7a1 1 0 001 1h1m4 5h7a1 1 0 001-1V7a1 1 0 00-1-1H7a1 1 0 00-1 1v7a1 1 0 001 1z"
                  stroke="var(--accents-2)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </motion.svg>
          </AnimatePresence>
        </span>
      </button>
      <span>{language}</span>

      <Highlight
        {...defaultProps}
        theme={theme}
        code={source}
        language={language}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${styles.pre} ${className}`}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} ${styles.inline}`;
              }
              return (
                <div key={i} {...lineProps}>
                  <span className={styles.numbers}>{i + 1}</span>
                  <span className={styles.content}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
