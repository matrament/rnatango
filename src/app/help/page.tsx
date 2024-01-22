"use client";
import TestHistogram from "@/components/echarts/TestHistogram";
import styles from "./page.module.css";

const Help = () => {
  return (
    <>
      <div className={styles.scenario}>
        <p>Help</p>
      </div>
      <TestHistogram />
    </>
  );
};

export default Help;
