import { cx } from 'lib/utils';
import styles from './Prose.module.css';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const Prose = ({ className, children }: Props) => {
  return <div className={cx(styles.prose, className)}>{children}</div>;
};
