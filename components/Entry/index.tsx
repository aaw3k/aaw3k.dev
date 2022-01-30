import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Entry.module.css';

type Props = {
  title?: string;
  image?: string;
  text?: string;
  link: string;
  meta?: string[] | React.ReactNode[];
};

export const Entry = ({ title, image, text, link, meta }: Props) => {
  const isInternal = (href: string) =>
    href && (href.startsWith('/') || href.startsWith('#'));
  const isEmpty = (href: string) => href && href.startsWith('');

  const Container = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    if (isInternal(href)) {
      return (
        <Link href={href}>
          <a className={styles.root}>{children}</a>
        </Link>
      );
    }

    if (!isEmpty(href)) {
      return (
        <>
          <div className={`${styles.root} ${styles.empty}`}>{children}</div>
        </>
      );
    }

    return (
      <>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className={styles.root}
        >
          {children}
        </a>
      </>
    );
  };

  return (
    <Container href={link}>
      {image && (
        <div>
          <Image src={image} alt={title} width={48} height={48} quality={100} />
        </div>
      )}
      <div>
        <h3>
          {title}

          {isEmpty(link) && !isInternal(link) ? (
            <svg
              width={20}
              height={20}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 12v3c0 .5-.5 1-1 1H5c-.5 0-1-.5-1-1V7c0-.5.5-1 1-1h3M8 12l8-8m0 0v5m0-5h-5"
                stroke="var(--accents-2)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </h3>

        {meta && meta.length > 0 ? (
          <span>
            {meta.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item}
                  {i + 1 < meta.length ? (
                    <>
                      {' '}
                      <span>&middot;</span>{' '}
                    </>
                  ) : null}
                </React.Fragment>
              );
            })}
          </span>
        ) : null}

        <p>{text}</p>
      </div>
    </Container>
  );
};
