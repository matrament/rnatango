"use client";
import styles from "./page.module.css";

const CiteUs = () => {
  return (
    <div className={styles.scenario}>
      <h1>Cite us</h1>
      <p>
        In any published work that has made use of RNAtango, please cite the
        following paper:
        <br />
        <br />
        M. Mackowiak, B. Adamczyk, M. Szachniuk, T. Zok (2024)
        <br />
        RNAtango for torsion-angle based similarity analysis of RNA 3D
        structures, <i>in submission</i>
      </p>
    </div>
  );
};

export default CiteUs;
