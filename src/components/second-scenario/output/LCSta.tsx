"use client";
import { Suspense, useEffect, useState } from "react";
import { RenderLoader } from "../../common/RenderLoader";
import MolStarWrapper from "./MolStarWrapper";
import config from "../../../config.json";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Radio,
  Row,
  Table,
  TableColumnsType,
} from "antd";
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
  mcq: number;
  lcs: number;
  fixed: any;
}

function downloadFile(type: any, url: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  fetch(url, requestOptions)
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let pom = document.createElement("a");
      pom.setAttribute("href", url);
      pom.setAttribute("download", type);
      pom.click();
    });
}

const LCSta = (props: {
  target: { sequence: string; targetId: string };
  lcs: {
    lcs: second_scenario_result_differences_lcs;
    name: string;
    modelId: string;
  }[];
}) => {
  const [dataset, setDataset] = useState<any>([]);
  const [csvData, setCsvData] = useState<datasetModels[]>([]);
  const [activeModel, setActiveModel] = useState(0);

  useEffect(() => {
    // FIXME: optimize this state, delete for loop
    let dataset_temp: any = [];
    let length_seq = props.target.sequence.length;
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
  }, [props.target, props.lcs]);

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
          {props.target.sequence ?? ""}
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
        compare: (a, b) => a.mcq - b.mcq,
      },
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ textAlign: "center", marginTop: "0" }}>LCS-TA results</h2>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        rowClassName={(record) =>
          record.model === props.lcs[activeModel].name
            ? styles.tableRowActive
            : styles.tableRow
        }
        columns={columns}
        dataSource={dataset}
        size="middle"
        bordered
        pagination={{ position: ["bottomCenter"] }}
        scroll={{ x: true }}
      />
      <div className={styles.tableButton} style={{ marginBottom: "30px" }}>
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

      <Row justify="center">
        {
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#04afa4",
              },
            }}
          >
            <Radio.Group
              size="small"
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              {props.lcs.map((model, index) => {
                return (
                  <Radio.Button key={index} value={index}>
                    <b>{model.name}</b>
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </ConfigProvider>
        }
      </Row>
      <Suspense fallback={<RenderLoader />}>
        <div style={{ display: "block", margin: "30px 30px 0 30px" }}>
          <MolStarWrapper
            model_file={
              config.SERVER_URL +
              "one-many/tertiary/structure/" +
              props.lcs[activeModel].modelId
            }
            target_file={
              config.SERVER_URL +
              "one-many/tertiary/structure/" +
              props.target.targetId
            }
          />
        </div>
      </Suspense>
      <div className={styles.tableButton} style={{ marginBottom: "25px" }}>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() =>
            downloadFile(
              props.lcs[activeModel].name.split(".")[0] + ".cif",
              config.SERVER_URL +
                "one-many/tertiary/structure/" +
                props.lcs[activeModel].modelId
            )
          }
        >
          Download .cif
        </Button>
      </div>
    </div>
  );
};

export default LCSta;
