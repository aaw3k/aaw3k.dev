import styles from './LoadingDots.module.css';

type StyleSheet = {
  style?: React.CSSProperties;
};

export const LoadingDots = ({ style }: StyleSheet) => {
  return (
    <span className={styles.loading} style={style}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
};
