"use client";
import styles from "./page.module.css";

const TableFiles = () => {
  return (
    <table className={styles.table} style={{ width: "60%" }}>
      <tbody>
        <tr>
          <td className={styles.headerCell} width="100px">
            Example model name
          </td>
          <td className={styles.headerCell} width="100px">
            Original name
          </td>
          <td className={styles.headerCell} width="100px">
            Example model name
          </td>
          <td className={styles.headerCell} width="100px">
            Original name
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>PZ18_model00</td>
          <td className={styles.cell}>5TPY</td>
          <td className={styles.cell}>PZ18_model04</td>
          <td className={styles.cell}>18_Ding_1</td>
        </tr>
        <tr>
          <td className={styles.cell}>PZ18_model01</td>
          <td className={styles.cell}>18_Szachniuk_1</td>
          <td className={styles.cell}>PZ18_model05</td>
          <td className={styles.cell}>18_Chen_1</td>
        </tr>
        <tr>
          <td className={styles.cell}>PZ18_model02</td>
          <td className={styles.cell}>18_Lee_1</td>
          <td className={styles.cell}>PZ18_model06</td>
          <td className={styles.cell}>18_Das_1</td>
        </tr>
        <tr>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            PZ18_model03
          </td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            18_YagoubAli_1
          </td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            PZ18_model07
          </td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            18_Dokholyan_1
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableFiles;
