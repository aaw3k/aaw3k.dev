//@ts-nocheck
import { Children, useState, useCallback, useEffect } from 'react';
import { theme } from 'lib/prism';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';

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

export function Code({ children }: { children?: React.ReactNode }) {
  const { source, className } = getCodeData(children);
  const [language, { bg = `` }] = getParams(className);
  const shouldHighlightLine = calculateLinesToHighlight(bg);

  const [isCopied, setCopied] = useCodeToClipboard(source);

  return (
    <div className={styles.root}>
      <button onClick={setCopied}>
        <span className={isCopied ? styles.active : (null as any)}>
          <svg
            width={16}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isCopied ? (
              <path
                d="M14 4l-8.25 8L2 8.364"
                stroke="var(--green)"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M10.333 2.75v-.583C10.333 1.522 9.811 1 9.167 1h-7C1.522 1 1 1.522 1 2.167v7c0 .644.522 1.166 1.167 1.166h.583m2.917 3.5v-7c0-.644.522-1.166 1.166-1.166h7c.645 0 1.167.522 1.167 1.166v7c0 .645-.522 1.167-1.167 1.167h-7a1.167 1.167 0 01-1.166-1.167z"
                stroke="var(--accents-2)"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
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
