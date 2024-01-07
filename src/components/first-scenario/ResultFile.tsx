import styles from "./first-scenario.module.css";
import { Table, Button, Collapse } from "antd";
import type { ColumnsType } from "antd/es/table";
// import { result } from "../result.json";
import { DownOutlined, UpOutlined, DownloadOutlined } from "@ant-design/icons";

interface AngleType {
  key: React.Key;
  residue: string;
  alpha: number;
  beta: number;
  gamma: number;
  delta: number;
  epsilon: number;
  zeta: number;
  eta: number;
  theta: number;
  eta_prim: number;
  theta_prim: number;
  chi: number;
}

const columns: ColumnsType<AngleType> = [
  {
    title: "Residue",
    key: "residue",
    width: 30,
    fixed: "left",
  },
  {
    title: "alpha (\u03B1)",
    key: "alpha",
    width: 30,
  },
  {
    title: "beta (\u03B2)",
    key: "beta",
    width: 30,
  },
  {
    title: "gamma (\u03B3)",
    key: "gamma",
    width: 30,
  },
  {
    title: "delta (\u03B4)",
    key: "delta",
    width: 30,
  },
  {
    title: "epsilon (\u03B5)",
    key: "epsilon",
    width: 30,
  },
  {
    title: "zeta (\u03B6)",
    key: "zeta",
    width: 30,
  },
  {
    title: "eta (\u03B7)",
    key: "eta",
    width: 30,
  },
  {
    title: "theta (\u03B8)",
    key: "theta",
    width: 30,
  },
  {
    title: "eta prim (\u03B7')",
    key: "eta_prim",
    width: 30,
  },
  {
    title: "theta prim (\u03B8')",
    key: "theta_prim",
    width: 30,
  },
  {
    title: "chi (\u03C7)",
    key: "chi",
    width: 30,
  },
];

const data: AngleType[] = [];

const ResultFile = () => {
  return (
    <div
      className={styles.scenario}
      style={{ paddingTop: "40px", paddingBottom: "40px" }}
    >
      <p>TaskId: 196d7adc-c837-4cb4-9f7c-008277a3f1ec</p>
      <Collapse
        style={{ width: "600px" }}
        items={[
          {
            key: "1",
            label: "Table of torsion angles",
            children: (
              <div style={{ marginBottom: "20px" }}>
                <div>bla bla select column</div>
                <Table
                  columns={columns}
                  dataSource={data}
                  size="middle"
                  bordered
                  scroll={{ x: "calc(700px + 50%)", y: 1000 }}
                />
              </div>
            ),
          },
        ]}
      />

      <Button
        size="large"
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        // onClick={() => testFunc()}
      >
        Download
      </Button>
    </div>
  );
};

export default ResultFile;
