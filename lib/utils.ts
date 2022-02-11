import clsx from 'clsx';
export { clsx as cx };

export const isExternalLink = (url: string) => {
  if (typeof url === 'string') {
    return url.startsWith('http');
  }

  return false;
};

export const isEmptyLink = (url: string) => {
  if (typeof url === 'string') {
    return url === '';
  }

  return false;
};

type formatDateProps = {
  timestamp?: number | string | null;
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
};

export const formatDate = ({
  timestamp = null,
  year = 'numeric',
  month = 'long',
  day = 'numeric',
}: formatDateProps) => {
  const date = timestamp ? new Date(timestamp) : new Date();

  const formatted = date.toLocaleDateString('en-us', {
    year,
    month,
    day,
  });

  return {
    formatted,
  };
};

export const prefersReducedMotion = (() => {
  let shouldReduceMotion: boolean | undefined = undefined;

  return () => {
    if (shouldReduceMotion === undefined && typeof window !== 'undefined') {
      const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }

    return shouldReduceMotion;
  };
})();
