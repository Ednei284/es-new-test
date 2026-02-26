import styles from "./styles.module.css";

export function Divider1({ children }) {
  return (
    <div className={styles.antiWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.insider}>{children}</div>
      </div>
    </div>
  );
}

export function Divider2({ children }) {
  return <div className={styles.wrapper2}>{children}</div>;
}

export function Divider3({ children }) {
  return (
    <div className={styles.wrapper3}>
      <div className={styles.insider3}>{children}</div>
    </div>
  );
}
