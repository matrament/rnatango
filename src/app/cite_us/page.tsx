"use client";
import styles from "./page.module.css";

const CiteUs = () => {
  return (
    <div className={styles.scenario}>
      <h1 style={{ textAlign: "center" }}>Cite us</h1>
      <p>
        In any published work that has made use of RNAtango, please cite the
        following paper:
        <br />
        <br />
        M. Mackowiak, B. Adamczyk, M. Szachniuk, T. Zok (2024)
        <br />
        RNAtango: analysing and comparing 3D RNA structures via torsional
        angles, <i>submitted</i>
      </p>
      <p style={{ whiteSpace: "pre-line" }}>
        Other related works include:
        <br />
        <br />
        T. Zok, M. Popenda, M. Szachniuk (2014)
        <br />
        MCQ4Structures to compute similarity of molecule structures,{" "}
        <i>Central European Journal of Operations Research</i>
        <br />
        22(3):457-474 (doi:{" "}
        <a href="https://doi.org/10.1007/s10100-013-0296-5">
          10.1007/s10100-013-0296-5
        </a>
        )
      </p>
      <p>
        J. Wiedemann, T. Zok, M. Milostan, M. Szachniuk (2017)
        <br />
        LCS-TA to identify similar fragments in RNA 3D structures,{" "}
        <i>BMC Bioinformatics</i> (doi:{" "}
        <a href="https://doi.org/10.1186/s12859-017-1867-6">
          10.1186/s12859-017-1867-6
        </a>
        ).
      </p>
    </div>
  );
};

export default CiteUs;
