import NextLink from 'next/link';
import cx from 'clsx';

import styles from './Link.module.css';

type Props = {
  href: string;
  className?: string;
  underline?: boolean;
};

export const Link: React.FC<Props> = ({
  href,
  className,
  underline,
  children,
}) => {
  const isInternal = (href: string) =>
    href && (href.startsWith('/') || href.startsWith('#'));

  const classes = cx(className, styles.root, {
    [styles.underline]: underline,
  });

  if (isInternal(href)) {
    return (
      <NextLink href={href}>
        <a className={classes}>{children}</a>
      </NextLink>
    );
  }

  return (
    <>
      <a
        className={classes}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    </>
  );
};
