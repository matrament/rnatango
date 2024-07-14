"use client";
import styles from "../first-scenario/first-scenario.module.css";
import { useEffect, useState } from "react";

const Nucleobase = (props: {
  nucleotide: string;
  index: number;
  residuesWithoutAtoms: number[];
  range: number[];
  discontinuity: number[][];
}) => {
  return (
    <div className={styles.nucleobasesNonSelect}>
      <div className={styles.index}>
        {props.index % 5 == 0 ? props.index : null}
      </div>
      <div
        className={`${styles.residue} ${
          props.range.includes(props.index)
            ? styles.activeC
            : styles.nonactiveNonselect
        }
        ${
          props.discontinuity[0].includes(props.index)
            ? styles.startRange
            : null
        }
        ${props.discontinuity[1].includes(props.index) ? styles.endRange : null}
      ${
        props.residuesWithoutAtoms.includes(props.index) ? styles.disable : null
      }`}
      >
        {props.nucleotide}
      </div>
    </div>
  );
};

const FullChainAnalysis = (props: {
  sequence: string;
  residuesWithoutAtoms: number[];
  range: number[];
  index: number;
  continousfragments: number[][];
}) => {
  const [discontinuity, setDiscontinuity] = useState<number[][]>([[], []]);

  useEffect(() => {
    const leftElements: number[] = [];
    const rightElements: number[] = [];

    props.continousfragments.forEach((subList) => {
      leftElements.push(subList[0]);
      rightElements.push(subList[1]);
    });
    leftElements.shift();
    rightElements.pop();
    setDiscontinuity([leftElements, rightElements]);
  }, [props.continousfragments]);

  return (
    <div className={styles.sequencetarget}>
      {props.sequence
        .toUpperCase()
        .split("")
        .map((nucleotide, index) => (
          <Nucleobase
            nucleotide={nucleotide}
            index={index + props.index}
            key={index}
            residuesWithoutAtoms={props.residuesWithoutAtoms}
            range={Array.from(
              { length: props.range[1] - props.range[0] + 1 },
              (v, i) => i + props.range[0]
            )}
            discontinuity={discontinuity}
          />
        ))}
    </div>
  );
};
export default FullChainAnalysis;
