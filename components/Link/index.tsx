import NextLink from 'next/link';
import { cx, isExternalLink, isEmptyLink } from 'lib/utils';

import styles from './Link.module.css';

type Props = {
  to?: string;
  href?: string;
  className?: string;
  underline?: boolean;
  children: React.ReactNode;
};

export const Link = ({ to, href, className, underline, children }: Props) => {
  const url = to ?? (href as string);

  const classes = cx(className, {
    [styles.root]: href,
    [styles.underline]: underline,
  });

  if (isExternalLink(url)) {
    return (
      <a
        className={classes}
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  if (isEmptyLink(url)) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <NextLink href={url} className={classes}>
      {children}
    </NextLink>
  );
};
