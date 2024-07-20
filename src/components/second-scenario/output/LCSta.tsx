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
import {
  second_scenario_result_differences_lcs,
  second_scenario_result_differences_residues,
} from "../../../types/modelsType";
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
    residue: second_scenario_result_differences_residues[];
  }[];
  chain: string;
}) => {
  const [dataset, setDataset] = useState<any>([]);
  const [csvData, setCsvData] = useState<datasetModels[]>([]);
  const [activeModel, setActiveModel] = useState(0);
  const [intersection, setIntersection] = useState([]);

  useEffect(() => {
    // FIXME: optimize this state, delete for loop
    let dataset_temp: any = [];
    let intersection_temp: any = [];
    props.lcs.map(
      (
        model: {
          lcs: second_scenario_result_differences_lcs;
          name: string;
          modelId: string;
          residue: second_scenario_result_differences_residues[];
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
        let model_seq: string[] = [];
        let target_residues: string[] = [];
        let model_residues: string[] = [];

        model.residue.map((res) => {
          let residue = "-";
          if (
            res.number >= model.lcs.modelNucleotideRange.fromInclusive &&
            res.number <= model.lcs.modelNucleotideRange.toInclusive
          ) {
            residue = "1";
          }
          model_seq.push(residue);
        });
        model_residues.push(
          `${props.chain}.${model.residue[0].name}${model.lcs.modelNucleotideRange.fromInclusive}`
        );
        model_residues.push(
          `${props.chain}.${model.residue[model.residue.length - 1].name}${
            model.lcs.modelNucleotideRange.toInclusive
          }`
        );
        target_residues.push(
          `${props.chain}.${model.residue[0].name}${model.lcs.targetNucleotideRange.fromInclusive}`
        );
        target_residues.push(
          `${props.chain}.${model.residue[model.residue.length - 1].name}${
            model.lcs.targetNucleotideRange.toInclusive
          }`
        );
        let target_res = target_residues.join("-");
        let model_res = model_residues.join("-");
        intersection_temp.push([
          {
            target: model.lcs.modelNucleotideRange,
            model: model.lcs.modelNucleotideRange,
          },
        ]);
        rowData.target = model_seq.join("");
        dataset_temp.push(rowData);
      }
    );
    console.log(intersection_temp);
    setIntersection(intersection_temp);
    setDataset(dataset_temp);
    setCsvData(dataset_temp);
    // console.log(
    //   `${
    //     config.SERVER_URL +
    //     "/one-many/tertiary/structure/" +
    //     props.lcs[activeModel].modelId
    //   }`
    // );
    // console.log(
    //   `${
    //     config.SERVER_URL +
    //     "/one-many/tertiary/structure/" +
    //     props.target.targetId
    //   }`
    // );
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
      {intersection.length != 0 ? (
        <Suspense fallback={<RenderLoader />}>
          <div style={{ display: "block", margin: "30px 30px 0 30px" }}>
            <MolStarWrapper
              model_file={
                config.SERVER_URL +
                "/one-many/tertiary/structure/" +
                props.lcs[activeModel].modelId
              }
              target_file={
                config.SERVER_URL +
                "/one-many/tertiary/structure/" +
                props.target.targetId
              }
              lcs={props.lcs[activeModel].lcs}
            />
          </div>
        </Suspense>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "15px",
        }}
      >
        <tr>
          <th>
            <div>
              <span>model</span>
              <div
                style={{
                  backgroundColor: "#04afa4",
                  height: "10px",
                  width: "100px",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </th>
          <th>
            <div>
              <span>target</span>
              <div
                style={{
                  backgroundColor: "#fb5f4c",
                  height: "10px",
                  width: "100px",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </th>
        </tr>
      </div>
      <div className={styles.tableButtonlcs} style={{ marginBottom: "25px" }}>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() =>
            downloadFile(
              props.target.targetId + ".cif",
              config.SERVER_URL +
                "/one-many/tertiary/structure/" +
                props.target.targetId
            )
          }
        >
          target.cif
        </Button>

        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() =>
            downloadFile(
              props.lcs[activeModel].name.split(".")[0] + ".cif",
              config.SERVER_URL +
                "/one-many/tertiary/structure/" +
                props.lcs[activeModel].modelId
            )
          }
        >
          model.cif
        </Button>
      </div>
    </div>
  );
};

export default LCSta;
