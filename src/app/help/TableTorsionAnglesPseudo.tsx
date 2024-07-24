"use client";
import styles from "./page.module.css";

const TableTorsionAnglesPseudo = () => {
  return (
    <table className={styles.table} style={{ width: "30%" }}>
      <tbody>
        <tr>
          <td className={styles.headerCell} width="125px">
            Pseudotorsion angle
          </td>
          <td className={styles.headerCell} width="125px">
            Atoms involved
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B7`}</td>
          <td className={styles.cell}>
            C4{`'`}
            <sub>n-1</sub>-P-C4{`'`}-P<sub>n+1</sub>
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B8`}</td>
          <td className={styles.cell}>
            P-C4{`'`}-P<sub>n+1</sub>-C4{`'`}
            <sub>n+1</sub>
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B7'`}</td>
          <td className={styles.cell}>
            C1{`'`}
            <sub>n-1</sub>-P-C1{`'`}-P<sub>n+1</sub>
          </td>
        </tr>
        <tr>
          <td
            className={`${styles.cell} ${styles.lastRowCell}`}
          >{`\u03B8'`}</td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            P-C1{`'`}-P<sub>n+1</sub>-C1{`'`}
            <sub>n+1</sub>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableTorsionAnglesPseudo;
