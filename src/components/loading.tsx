"use client";
import styles from "./components.module.css";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.dash} ${styles.one}`}></div>
      <div className={`${styles.dash} ${styles.two}`}></div>
      <div className={`${styles.dash} ${styles.three}`}></div>
      <div className={`${styles.dash} ${styles.four}`}></div>
    </div>
  );
};

export default Loading;
