"use client";
import { Suspense, useEffect, useState } from "react";
import { RenderLoader } from "../../common/RenderLoader";
import MolStarWrapper from "./MolStarWrapper";
import config from "../../../config.json";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";
import styles from "../../first-scenario/first-scenario.module.css";
import { second_scenario_result_differences_lcs } from "../../../types/modelsType";
import { exportDataToCSV } from "@/utils/exportDataToCSV";

type datasetModels = {
  [key: string]: string | number | null;
};

interface DataType {
  key: React.Key;
  model: string;
  target: string;
  lcs: number;
  fixed: any;
}

const LCSta = (props: {
  targetSequence: string;
  lcs: {
    lcs: second_scenario_result_differences_lcs;
    name: string;
    modelId: string;
  }[];
}) => {
  const [dataset, setDataset] = useState<any>([]);
  const [csvData, setCsvData] = useState<datasetModels[]>([]);

  useEffect(() => {
    // FIXME: optimize this state, delete for loop
    let dataset_temp: any = [];
    let length_seq = props.targetSequence.length;
    props.lcs.map(
      (
        model: {
          lcs: second_scenario_result_differences_lcs;
          name: string;
          modelId: string;
        },
        index
      ) => {
        let rowData = {
          model: model.name,
          key: index,
          target: "",
          mcq: Number(model.lcs.fragmentMCQ.toFixed(2)),
          lcs: Number(model.lcs.coveragePercent.toFixed(2)),
        };
        let model_seq = [];
        for (let i = 0; i < length_seq; i++) {
          let residue = "-";
          if (
            i >=
              model.lcs.modelNucleotideRange.fromInclusive -
                model.lcs.targetNucleotideRange.fromInclusive &&
            i <=
              model.lcs.modelNucleotideRange.toInclusive -
                model.lcs.targetNucleotideRange.fromInclusive
          ) {
            residue = "1";
          }
          model_seq.push(residue);
        }
        rowData.target = model_seq.join("");
        dataset_temp.push(rowData);
      }
    );
    setDataset(dataset_temp);
    setCsvData(dataset_temp);
  }, [props.targetSequence, props.lcs]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      width: 200,
      fixed: "left",
    },
    {
      title: () => (
        <p
          className={styles.tableAngleMono}
          style={{ letterSpacing: "5px", fontSize: "16px" }}
        >
          {props.targetSequence ?? ""}
        </p>
      ),
      dataIndex: "target",
      key: "target",
      render: (text) => (
        <p
          className={styles.tableAngleMono}
          style={{ letterSpacing: "5px", fontSize: "16px" }}
        >
          {text}
        </p>
      ),
    },
    {
      title: "LCS [%]",
      dataIndex: "lcs",
      key: "lcs",
      width: 200,
      fixed: "right",
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) => a.lcs - b.lcs,
      },
    },
    {
      title: "MCQ [\u00B0]",
      dataIndex: "mcq",
      key: "mcq",
      width: 200,
      fixed: "right",
      sorter: {
        compare: (a, b) => a.lcs - b.lcs,
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>LCS-TA</h2>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={columns}
        dataSource={dataset}
        size="middle"
        bordered
        pagination={{ position: ["bottomCenter"] }}
        scroll={{ x: true }}
      />
      <div className={styles.tableButton}>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() =>
            exportDataToCSV(
              csvData.sort((a: any, b: any) => a.key - b.key),
              columns as [any],
              "LCS_TA",
              "models_comparsion"
            )
          }
        >
          Download .csv
        </Button>
      </div>
      <Suspense fallback={<RenderLoader />}>
        <div
          style={{ display: "block", marginTop: "50px", marginBottom: "50px" }}
        >
          {/* <MolStarWrapper
            structure_file={
              config.SERVER_URL +
              "/one-many/tertiary/structure/575b1206-3340-47f4-9373-5d0c92782024"
            }
            // motif_files={[]}
            // contacts={inContact}
            representation={"ball-and-stick"}
          /> */}
        </div>
      </Suspense>
    </div>
  );
};

export default LCSta;
