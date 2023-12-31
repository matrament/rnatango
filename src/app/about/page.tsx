"use client";
import styles from "./page.module.css";

const About = () => {
  return (
    <div className={styles.scenario}>
      <h1>About</h1>
      <p>
        WebTetrado reads the 3D structures of nucleic acids given in PDB or
        mmCIF format. It identifies RNA/DNA base pairs and analyzes their
        patterns to find and classify tetrads and quadruplexes. WebTetrado
        engine integrates functions, including those of ElTetrado, to visualize
        G4 structures and compute their parameters such as rise, twist,
        planarity, Chi angle, etc. It classifies loop topologies and tetrad
        combinations. It assigns tetrads to one of the ONZ classes (O, N, Z)
        alongside with the directionality of the tetrad (+/-) determined by the
        bonds between bases and their non-canonical interactions. For a
        standalone version of the computational engine go to GitHub.
      </p>
      <h3>Team</h3>
      <p>
        Bartosz Adamczyk1, Michał Żurkowski1,2, Marta Szachniuk1,2, Tomasz
        Żok1,2 Institute of Computing Science & European Centre for
        Bioinformatics and Genomics, Poznan University of Technology, 60-965
        Poznan, Poland Institute of Bioorganic Chemistry, Polish Academy of
        Sciences, 61-704 Poznan, Poland
      </p>
    </div>
  );
};

export default About;
