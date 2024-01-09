"use client";
import { torsion_angles } from "@/types/modelsType";
import { useEffect, useState } from "react";
import result from "../../components/first-scenario/result.json";
import ResultFile from "../../components/first-scenario/ResultTable";
import styles from "./page.module.css";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ResultPage = () => {
  const [resultTorsionAngle, setResultTorsionAngle] = useState<
    torsion_angles[]
  >([]);
  useEffect(() => {
    let x: any = [];
    for (let i = 0; i < result.torsionAngles.length; i++) {
      x[i] = { chain: result.torsionAngles[i].chain, residues: [] };
      for (let j = 0; j < result.torsionAngles[i].residues.length; j++) {
        let z: { [key: string]: number | null } = {};
        let y = result.torsionAngles[i].chain.name.concat(
          ".",
          result.torsionAngles[i].residues[j].name,
          result.torsionAngles[i].residues[j].number.toString()
        );
        x[i].residues[j] = { name: y, key: j };
        for (
          let k = 0;
          k < result.torsionAngles[i].residues[j].torsionAngles.length;
          k++
        ) {
          let a = result.torsionAngles[i].residues[j].torsionAngles[k].value;
          z[
            result.torsionAngles[i].residues[j].torsionAngles[
              k
            ].angle.toLowerCase()
          ] = a == null ? a : Number(a.toFixed(4));
        }
        x[i].residues[j] = { ...x[i].residues[j], ...z };
      }
    }
    setResultTorsionAngle(x);
    console.log(x);
  }, []);

  function round(num: number, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = num * p * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <h2>TaskId: 196d7adc-c837-4cb4-9f7c-008277a3f1ec</h2>
        <div
          style={{
            display: "flex",
            rowGap: "15px",
            flexDirection: "column",
            width: "90%",
            marginBottom: "20px",
          }}
        >
          {resultTorsionAngle.map((el) => (
            <ResultFile
              key={el.chain.sequence}
              dataAngle={el.residues}
              chain={el.chain.name}
              sequence={el.chain.sequence}
            />
          ))}
        </div>

        <Button
          size="large"
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          // onClick={() => roundFloat()}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
