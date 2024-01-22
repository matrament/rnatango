"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle, torsion_angles } from "@/types/modelsType";
import ResultTable from "../../../components/first-scenario/ResultTable";
import Loading from "@/components/loading";
import styles from "./page.module.css";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import HistogramResult from "@/components/first-scenario/HistogramResult";
import { processingResponce } from "@/utils/processingResponse";
import TestHistogram from "@/components/echarts/TestHistogram";

let emptyResult: single_result_angle = {
  torsionAngles: [],
};

const ResultPage = () => {
  const params = useParams<{ taskid: string }>();
  const [getResultFile, setGetResultFile] =
    useState<single_result_angle>(emptyResult);
  const [resultTorsionAngle, setResultTorsionAngle] = useState<
    torsion_angles[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    processingResponce(params.taskid, setGetResultFile);
    console.log(getResultFile);
  }, [params.taskid]);

  useEffect(() => {
    getResultFile.torsionAngles?.length != 0 ? getFile() : null;
  }, [getResultFile]); // FIXME: zobaczyc czy tu cos nie gra najlepiej dla 1ffk

  function getFile() {
    let x: any = [];
    for (let i = 0; i < getResultFile.torsionAngles.length; i++) {
      x[i] = { chain: getResultFile.torsionAngles[i].chain, residues: [] };
      for (let j = 0; j < getResultFile.torsionAngles[i].residues.length; j++) {
        let z: { [key: string]: number | null } = {};
        let y = getResultFile.torsionAngles[i].chain.name.concat(
          ".",
          getResultFile.torsionAngles[i].residues[j].name,
          getResultFile.torsionAngles[i].residues[j].number.toString()
        );
        x[i].residues[j] = { name: y, key: j };
        for (
          let k = 0;
          k < getResultFile.torsionAngles[i].residues[j].torsionAngles.length;
          k++
        ) {
          let a =
            getResultFile.torsionAngles[i].residues[j].torsionAngles[k].value;
          z[
            getResultFile.torsionAngles[i].residues[j].torsionAngles[
              k
            ].angle.toLowerCase()
          ] = a == null ? a : Number(a.toFixed(4));
        }
        x[i].residues[j] = { ...x[i].residues[j], ...z };
      }
    }
    setResultTorsionAngle(x);
    setLoading(false);
    console.log(resultTorsionAngle);
  }

  const test = () => {
    console.log();
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <h2>TaskId: {params.taskid}</h2>
        {/* <Loading /> */}
        {!loading ? (
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
              <ResultTable
                key={el.chain.sequence}
                dataAngle={el.residues}
                chain={el.chain.name}
                sequence={el.chain.sequence}
              />
            ))}
            <h2>Angle Torsion Histograms</h2>
            {resultTorsionAngle.map((el) => (
              <HistogramResult
                key={el.chain.sequence}
                title={"alpha"}
                angle={el.residues.map((a) => a.alpha)}
              />
            ))}
            {resultTorsionAngle.map((el) => (
              <HistogramResult
                key={el.chain.sequence}
                title={"beta"}
                angle={el.residues.map((a) => a.beta)}
              />
            ))}
            {resultTorsionAngle.map((el) => (
              <HistogramResult
                key={el.chain.sequence}
                title={"gamma"}
                angle={el.residues.map((a) => a.gamma)}
              />
            ))}
            <TestHistogram />
          </div>
        ) : null}
        <Button
          size="large"
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() => test()}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
