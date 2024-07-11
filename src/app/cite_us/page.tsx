"use client";
import styles from "./page.module.css";

const CiteUs = () => {
  return (
    <div className={styles.scenario}>
      <h1>
        <span>Help</span>
      </h1>
      <p>
        <b>
          In any published work that has made use of RNAtango, please cite the
          following paper:{" "}
        </b>
        <br />
        <br />
        M. Mackowiak, B. Adamczyk, M. Szachniuk, T. Zok (2024){" "}
        <b>
          RNAtango: analysing and comparing RNA 3D structures via torsional
          angles,{" "}
        </b>
        <i>submitted</i>
      </p>
      <p style={{ whiteSpace: "pre-line" }}>
        <b> Other related works include:</b>
        <br />
        <br />
        T. Zok, M. Popenda, M. Szachniuk (2014){" "}
        <b>
          MCQ4Structures to compute similarity of molecule structures, Central
          European Journal of Operations Research 22(3):457-474
        </b>{" "}
        (doi:{" "}
        <a
          style={{ color: "#04afa4" }}
          href="https://doi.org/10.1007/s10100-013-0296-5"
        >
          10.1007/s10100-013-0296-5
        </a>
        )
      </p>
      <p>
        J. Wiedemann, T. Zok, M. Milostan, M. Szachniuk (2017){" "}
        <b>
          LCS-TA to identify similar fragments in RNA 3D structures, BMC
          Bioinformatics 18:456
        </b>{" "}
        (doi:{" "}
        <a
          style={{ color: "#04afa4" }}
          href="https://doi.org/10.1186/s12859-017-1867-6"
        >
          10.1186/s12859-017-1867-6
        </a>
        )
      </p>
    </div>
  );
};

export default CiteUs;
