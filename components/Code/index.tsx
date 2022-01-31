//@ts-nocheck
import { Children } from 'react';
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

export function Code({ children }: { children?: React.ReactNode }) {
  const { source, className } = getCodeData(children);
  const [language, { bg = `` }] = getParams(className);
  const shouldHighlightLine = calculateLinesToHighlight(bg);

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={source}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${styles.root} ${className}`}>
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
  );
}
