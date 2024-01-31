"use client";
import styles from "./components.module.css";

const LoadingCard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "15vh",
      }}
    >
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingCard;
