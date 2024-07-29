"use client";
import styles from "./page.module.css";

const TableTorsionAngles = () => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.headerCell} width="125px">
            Torsion Angle
          </td>
          <td className={styles.headerCell} width="150px">
            Atoms involved
          </td>
          <td className={styles.headerCell} width="125px">
            Torsion Angle
          </td>
          <td className={styles.headerCell} width="150px">
            Atoms involved
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B1 (Alpha)`}</td>
          <td className={styles.cell}>
            O3{`'`}
            <sub>n-1</sub>-P-O5{`'`}-C5{`'`}
          </td>
          <td className={styles.cell}>{`\u03C7 (Chi)`}</td>
          <td className={styles.cell}>
            O4{`'`}-C1{`'`}-N1-C2
            <br />
            (pyrimidines)
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B2 (Beta)`}</td>
          <td className={styles.cell}>
            P-O5{`'`}-C5{`'`}-C4{`'`}
          </td>
          <td className={styles.cell}></td>
          <td className={styles.cell}>
            O4{`'`}-C1{`'`}-N9-C4
            <br />
            (purines)
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B3 (Gamma)`}</td>
          <td className={styles.cell}>
            O5{`'`}-C5{`'`}-C4{`'`}-C3{`'`}
          </td>
          <td className={styles.cell}>
            v<sub>0</sub>
          </td>
          <td className={styles.cell}>
            C4{`'`}-O4{`'`}-C1{`'`}-C2{`'`}
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B4 (Delta)`}</td>
          <td className={styles.cell}>
            C5{`'`}-C4{`'`}-C3{`'`}-O3{`'`}
          </td>
          <td className={styles.cell}>
            v<sub>1</sub>
          </td>
          <td className={styles.cell}>
            O4{`'`}-C1{`'`}-C2{`'`}-C3{`'`}
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B5 (Epsilon)`}</td>
          <td className={styles.cell}>
            C4{`'`}-C3{`'`}-O3{`'`}-O
          </td>
          <td className={styles.cell}>
            v<sub>2</sub>
          </td>
          <td className={styles.cell}>
            C1{`'`}-C2{`'`}-C3{`'`}-C4{`'`}
          </td>
        </tr>
        <tr>
          <td className={styles.cell}>{`\u03B6 (Zeta)`}</td>
          <td className={styles.cell}>
            C3{`'`}-O3{`'`}-P-O5{`'`}
            <sub>n+1</sub>
          </td>
          <td className={styles.cell}>
            v<sub>3</sub>
          </td>
          <td className={styles.cell}>
            C2{`'`}-C3{`'`}-C4{`'`}-O4{`'`}
          </td>
        </tr>
        <tr>
          <td className={`${styles.cell} ${styles.lastRowCell}`}></td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}></td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            v<sub>4</sub>
          </td>
          <td className={`${styles.cell} ${styles.lastRowCell}`}>
            C3{`'`}-C4{`'`}-O4{`'`}-C1{`'`}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableTorsionAngles;
