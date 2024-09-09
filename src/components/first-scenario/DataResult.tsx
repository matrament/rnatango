"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import {
  single_result_angle,
  torsion_angles,
  torsion_angles_residue,
} from "../../types/modelsType";
import { Alert, Col, Divider, Row, Select } from "antd";

import HistogramAngles from "./HistogramAngles";
import ResultTable from "./ResultTable";
import angles_new from "../../json/angles_new.json";
import BarPlotStats from "./BarPlotStats";

const angleName = {
  ["1-alpha"]: "Alpha (\u03B1) [\u00B0]",

  ["2-beta"]: "Beta (\u03B2) [\u00B0]",

  ["3-gamma"]: "Gamma (\u03B3) [\u00B0]",

  ["4-delta"]: "Delta (\u03B4) [\u00B0]",

  ["5-epsilon"]: "Epsilon (\u03B5) [\u00B0]",

  ["6-zeta"]: "Zeta (\u03B6) [\u00B0]",

  ["7-eta"]: "Eta (\u03B7) [\u00B0]",

  ["8-theta"]: "Theta (\u03B8) [\u00B0]",

  ["9-eta_prim"]: "Eta prim (\u03B7') [\u00B0]",

  ["10-theta_prim"]: "Theta prim (\u03B8') [\u00B0]",

  ["11-chi"]: "Chi (\u03C7) [\u00B0]",

  ["12-p"]: "P  [\u00B0]",
};

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [
  {
    label: "Alpha (\u03B1)",
    value: "1-alpha",
  },
  {
    label: "Beta (\u03B2)",
    value: "2-beta",
  },
  {
    label: "Gamma (\u03B3)",
    value: "3-gamma",
  },
  {
    label: "Delta (\u03B4)",
    value: "4-delta",
  },
  {
    label: "Epsilon (\u03B5)",
    value: "5-epsilon",
  },
  {
    label: "Zeta (\u03B6)",
    value: "6-zeta",
  },
  {
    label: "Eta (\u03B7)",
    value: "7-eta",
  },
  {
    label: "Theta (\u03B8)",
    value: "8-theta",
  },
  {
    label: "Eta prim (\u03B7')",
    value: "9-eta_prim",
  },
  {
    label: "Theta prim (\u03B8')",
    value: "10-theta_prim",
  },
  {
    label: "Chi (\u03C7)",
    value: "11-chi",
  },
  {
    label: "P",
    value: "12-p",
  },
];

const avgRange: { [key: string]: [number, number, number] } = {
  ["alpha"]: [55, 65, 75],

  ["beta"]: [176, -173, -162],

  ["gamma"]: [-63, -54, -45],

  ["delta"]: [-84, -80, -76],

  ["epsilon"]: [141, 150, 159],

  ["zeta"]: [66, 73, 80],

  ["eta"]: [0, 0, 0],

  ["theta"]: [0, 0, 0],

  ["eta_prim"]: [0, 0, 0],

  ["theta_prim"]: [0, 0, 0],

  ["chi"]: [142, 161, 180],

  ["p"]: [0, 0, 0],
};

const DataResult = (props: { resultFile: single_result_angle }) => {
  const [resultTorsionAngle, setResultTorsionAngle] = useState<
    torsion_angles[]
  >([]);
  const [concatResidues, setConcatResidues] = useState<
    torsion_angles_residue[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<{
    [key: number]: torsion_angles_residue[];
  }>([]);
  const [selectedAngles, setSelectedAngles] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAngles(Object.keys(angleName));
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

  type ObjectKey = keyof typeof angles_new;

  const handleChange = (value: string[]) => {
    value.sort((a, b) => {
      const numA = parseInt(a.split("-")[0], 10);
      const numB = parseInt(b.split("-")[0], 10);
      return numA - numB;
    });
    setSelectedAngles(value);
    let x: string[][] = value.map((e: string) => e.split("-"));
  };

  return (
    <div style={{ width: "100%" }}>
      {resultTorsionAngle.length != 0 ? (
        <div className={styles.scenario}>
          <h1 style={{ marginBottom: 0, marginTop: "30px" }}>
            {props.resultFile.structureName.length > 4
              ? props.resultFile.structureName.toLowerCase()
              : props.resultFile.structureName}
          </h1>
          <p
            style={{
              marginBottom: 0,
              color: "#8c8c8c",
              width: "100%",
              textAlign: "center",
            }}
          >
            {props.resultFile.structureTitle}
          </p>
          <Divider />
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
              <h2 style={{ marginTop: 0 }}>Torsion angle values</h2>

              {resultTorsionAngle.map((el, index) => (
                <div
                  style={{ paddingBottom: "10px", width: "100%" }}
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
                <Alert
                  message="The chain is discontinuous. Data are shown for each continuous
                  fragment separately."
                  type="info"
                  showIcon
                />
              ) : null}
            </div>
            <Divider />
            <Col>
              <h2 style={{ textAlign: "center", marginTop: 0 }}>
                Histograms of torsion angles
              </h2>

              <Row justify="center">
                <Col>
                  <p>Show/hide histograms:{"   "}</p>
                </Col>
                <Col
                  span={15}
                  style={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    options={options}
                    value={selectedAngles}
                    onChange={handleChange}
                    placeholder="Select angle(s) to display histogram(s)"
                    maxTagCount="responsive"
                  />
                </Col>
              </Row>

              <div className={styles.angle}>
                {selectedAngles.map((angleName) => (
                  <HistogramAngles
                    key={angleName.split("-")[1]}
                    title={angleName.split("-")[1]}
                    angle={concatResidues.map(
                      (el) => el[angleName.split("-")[1] as ObjectKey]
                    )}
                    fileName={props.resultFile.structureName}
                    avgRange={
                      concatResidues[0].name.split(".")[1][0] != "D"
                        ? avgRange[angleName.split("-")[1] as ObjectKey]
                        : [0, 0, 0]
                    }
                  />
                ))}
              </div>
              <Divider />
              <div className={styles.section} style={{ marginBottom: "10px" }}>
                <Col>
                  <h2 style={{ margin: 0 }}>
                    {"Statistics for Chi (\u03C7) angle"}
                  </h2>

                  <BarPlotStats
                    angle={concatResidues.map((el) => el.chi)}
                    type={"chi"}
                  />
                </Col>
                <Col>
                  <h2 style={{ margin: 0 }}>{"Statistics for P angle"}</h2>
                  <BarPlotStats
                    angle={concatResidues.map((el) => el.p)}
                    type={"p"}
                  />
                </Col>
              </div>
            </Col>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DataResult;
