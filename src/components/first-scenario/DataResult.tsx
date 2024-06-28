"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import {
  single_result_angle,
  torsion_angles,
  torsion_angles_residue,
} from "../../types/modelsType";
import { Alert, Select } from "antd";

import HistogramAngles from "./HistogramAngles";
import ResultTable from "./ResultTable";
import ChiStatistics from "./ChiStatistics";

const angleName = {
  alpha: "alpha (\u03B1)",

  beta: "beta (\u03B2)",

  gamma: "gamma (\u03B3)",

  delta: "delta (\u03B4)",

  epsilon: "epsilon (\u03B5)",

  zeta: "zeta (\u03B6)",

  eta: "eta (\u03B7)",

  theta: "theta (\u03B8)",

  eta_prim: "eta prim (\u03B7')",

  theta_prim: "theta prim (\u03B8')",

  chi: "chi (\u03C7)",
};

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [
  {
    label: "alpha (\u03B1)",
    value: "1-alpha",
  },
  {
    label: "beta (\u03B2)",
    value: "2-beta",
  },
  {
    label: "gamma (\u03B3)",
    value: "3-gamma",
  },
  {
    label: "delta (\u03B4)",
    value: "4-delta",
  },
  {
    label: "epsilon (\u03B5)",
    value: "5-epsilon",
  },
  {
    label: "zeta (\u03B6)",
    value: "6-zeta",
  },
  {
    label: "eta (\u03B7)",
    value: "7-eta",
  },
  {
    label: "theta (\u03B8)",
    value: "8-theta",
  },
  {
    label: "eta prim (\u03B7')",
    value: "9-eta_prim",
  },
  {
    label: "theta prim (\u03B8')",
    value: "10-theta_prim",
  },
  {
    label: "chi (\u03C7)",
    value: "11-chi",
  },
];

const DataResult = (props: { resultFile: single_result_angle }) => {
  const [resultTorsionAngle, setResultTorsionAngle] = useState<
    torsion_angles[]
  >([]);
  const [concatResidues, setConcatResidues] = useState<
    torsion_angles_residue[]
  >([]);
  const [anglesHistogram, setAnglesHistogram] = useState<string[]>(
    Object.keys(angleName)
  );
  const [selectedRows, setSelectedRows] = useState<{
    [key: number]: torsion_angles_residue[];
  }>([]);

  useEffect(() => {
    let x: any = [];
    for (let i = 0; i < props.resultFile.torsionAngles.length; i++) {
      x[i] = {
        chain: props.resultFile.torsionAngles[i].chain,
        residues: [],
      };
      for (
        let j = 0;
        j < props.resultFile.torsionAngles[i].residues.length;
        j++
      ) {
        let z: { [key: string]: number | null } = {};
        let y = props.resultFile.torsionAngles[i].chain.name.concat(
          ".",
          props.resultFile.torsionAngles[i].residues[j].name,
          props.resultFile.torsionAngles[i].residues[j].number.toString()
        );
        x[i].residues[j] = { name: y, key: j };
        for (
          let k = 0;
          k <
          props.resultFile.torsionAngles[i].residues[j].torsionAngles.length;
          k++
        ) {
          let a =
            props.resultFile.torsionAngles[i].residues[j].torsionAngles[k]
              .value;
          z[
            props.resultFile.torsionAngles[i].residues[j].torsionAngles[
              k
            ].angle.toLowerCase()
          ] = a == null ? a : Number(a.toFixed(2));
        }
        x[i].residues[j] = { ...x[i].residues[j], ...z };
      }
    }
    setResultTorsionAngle(x);

    setSelectedRows(x.map((chain: torsion_angles) => chain.residues));
    setConcatResidues(x.map((chain: torsion_angles) => chain.residues).flat());
  }, [props.resultFile]);

  useEffect(() => {
    let x: torsion_angles_residue[];
    x = Object.values(selectedRows).flat();
    Object.keys(selectedRows).length != 0 ? setConcatResidues(x) : null;
  }, [selectedRows]);

  type ObjectKey = keyof typeof angleName;

  const handleChange = (value: string[]) => {
    let x: string[][] = value.map((e: string) => e.split("-"));
  };

  return (
    <div style={{ width: "100%" }}>
      {resultTorsionAngle.length != 0 ? (
        <div className={styles.scenario}>
          <div className={styles.line}>
            <h1>{props.resultFile.structureName}</h1>
            <p style={{ marginTop: 0, color: "#8c8c8c" }}>
              {props.resultFile.structureMolecule}
            </p>
          </div>
          <div
            style={{
              display: "flex",

              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "30px",
                paddingRight: "30px",

                alignItems: "center",
              }}
            >
              <h2>Torsion Angle Table</h2>

              {resultTorsionAngle.map((el, index) => (
                <div
                  style={{ paddingBottom: "25px", width: "100%" }}
                  key={index}
                >
                  <ResultTable
                    dataAngle={el.residues}
                    chain={el.chain.name}
                    sequence={el.chain.sequence}
                    indexChain={index}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    fileName={props.resultFile.structureName}
                  />
                </div>
              ))}
              {props.resultFile.containDiscontinuousSequences ? (
                <div style={{ marginBottom: "25px" }}>
                  <Alert
                    message="The chain is discontinuous. Data are shown for each continuous
                  fragment separately."
                    type="info"
                    showIcon
                  />
                </div>
              ) : null}
            </div>

            <div className={styles.section}>
              <h2 style={{ textAlign: "center" }}>Torsion Angle Histograms</h2>
              <div style={{ padding: "10px" }}>
                Show/hide histograms:
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={Object.keys(angleName)}
                  onChange={handleChange}
                  placeholder="Select angle(s) to display histogram(s)"
                  maxTagCount="responsive"
                />
              </div>

              <div className={styles.angle}>
                {anglesHistogram.map((angleName) => (
                  <HistogramAngles
                    key={angleName}
                    title={angleName}
                    angle={concatResidues.map(
                      (el) => el[angleName as ObjectKey]
                    )}
                    fileName={props.resultFile.structureName}
                  />
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h2>Statistics of Chi Angle</h2>
              <div className={styles.angle}>
                <ChiStatistics angle={concatResidues.map((el) => el.chi)} />
                {/* <ChiTest
                title={angleName.chi}
                angle={concatResidues.map((el) => el.chi)}
              /> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DataResult;
