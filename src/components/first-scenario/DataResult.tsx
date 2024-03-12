"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import {
  single_result_angle,
  torsion_angles,
  torsion_angles_residue,
} from "../../types/modelsType";
import { Alert, Select } from "antd";
import dynamic from "next/dynamic";
import ChiTest from "./ChiTest";
// const HistogramAngles = dynamic(
//   () => import("@/components/first-scenario/HistogramAngles")
// );
// const ResultTable = dynamic(() => import("./ResultTable"));
// const ChiStatistics = dynamic(
//   () => import("@/components/first-scenario/ChiStatistics")
// );

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
    value: "alpha",
  },
  {
    label: "beta (\u03B2)",
    value: "beta",
  },
  {
    label: "gamma (\u03B3)",
    value: "gamma",
  },
  {
    label: "delta (\u03B4)",
    value: "delta",
  },
  {
    label: "epsilon (\u03B5)",
    value: "epsilon",
  },
  {
    label: "zeta (\u03B6)",
    value: "zeta",
  },
  {
    label: "eta (\u03B7)",
    value: "eta",
  },
  {
    label: "theta (\u03B8)",
    value: "theta",
  },
  {
    label: "eta prim (\u03B7')",
    value: "eta_prim",
  },
  {
    label: "theta prim (\u03B8')",
    value: "theta_prim",
  },
  {
    label: "chi (\u03C7)",
    value: "chi",
  },
];

const DataResult = (props: { getResultFile: single_result_angle }) => {
  const [resultTorsionAngle, setResultTorsionAngle] = useState<
    torsion_angles[]
  >([]);
  const [concatResidues, setConcatResidues] = useState<
    torsion_angles_residue[]
  >([]);
  const [showAngleHistogram, setShowAngleHistogram] = useState<string[]>(
    Object.keys(angleName)
  );
  const [selectRows, setSelectRows] = useState<{
    [key: number]: torsion_angles_residue[];
  }>([]);

  useEffect(() => {
    let x: any = [];
    for (let i = 0; i < props.getResultFile.torsionAngles.length; i++) {
      x[i] = {
        chain: props.getResultFile.torsionAngles[i].chain,
        residues: [],
      };
      for (
        let j = 0;
        j < props.getResultFile.torsionAngles[i].residues.length;
        j++
      ) {
        let z: { [key: string]: number | null } = {};
        let y = props.getResultFile.torsionAngles[i].chain.name.concat(
          ".",
          props.getResultFile.torsionAngles[i].residues[j].name,
          props.getResultFile.torsionAngles[i].residues[j].number.toString()
        );
        x[i].residues[j] = { name: y, key: j };
        for (
          let k = 0;
          k <
          props.getResultFile.torsionAngles[i].residues[j].torsionAngles.length;
          k++
        ) {
          let a =
            props.getResultFile.torsionAngles[i].residues[j].torsionAngles[k]
              .value;
          z[
            props.getResultFile.torsionAngles[i].residues[j].torsionAngles[
              k
            ].angle.toLowerCase()
          ] = a == null ? a : Number(a.toFixed(2));
        }
        x[i].residues[j] = { ...x[i].residues[j], ...z };
      }
    }
    setResultTorsionAngle(x);
    setSelectRows(x.map((chain: torsion_angles) => chain.residues));
    setConcatResidues(x.map((chain: torsion_angles) => chain.residues).flat());
  }, [props.getResultFile]);

  useEffect(() => {
    let x: torsion_angles_residue[];
    x = Object.values(selectRows).flat();
    Object.keys(selectRows).length != 0 ? setConcatResidues(x) : null;
  }, [selectRows]);

  type ObjectKey = keyof typeof angleName;

  const handleChange = (value: string[]) => {
    setShowAngleHistogram(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <div className={styles.line}>
          <h1>file ID</h1>
          <h3>...</h3>
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
            {/* <Alert
              message="The chain is discontinuous. Data are shown for each continuous
            fragment separately."
              type="info"
              showIcon
            /> */}

            {resultTorsionAngle.map((el, index) => (
              <div style={{ paddingBottom: "25px", width: "100%" }} key={index}>
                <ResultTable
                  dataAngle={el.residues}
                  chain={el.chain.name}
                  sequence={el.chain.sequence}
                  indexChain={index}
                  selectRows={selectRows}
                  setSelectRows={setSelectRows}
                />
              </div>
            ))}
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
              {showAngleHistogram.map((angleName) => (
                <HistogramAngles
                  key={angleName}
                  title={angleName}
                  angle={concatResidues.map((el) => el[angleName as ObjectKey])}
                />
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h2>Statistics of Chi Angle</h2>
            <div className={styles.angle}>
              <ChiStatistics angle={concatResidues.map((el) => el.chi)} />
              <ChiTest
                title={angleName.chi}
                angle={concatResidues.map((el) => el.chi)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataResult;
