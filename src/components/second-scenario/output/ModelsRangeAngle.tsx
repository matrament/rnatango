"use client";
import styles from "../../first-scenario/first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select, Button, Checkbox, Divider } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../../utils/exportDataToCSV";
import type { GetProp } from "antd";

type datasetModels = {
  [key: string]: string | number | null;
};

interface tableAngle {
  title: string;
  key: number;
  dataIndex: string;
  width: number;
  fixed: any;
}

const columns = [
  { key: "15", description: "1/12 \u00B7 \u03C0 = 15\u00B0" },
  { key: "30", description: "1/6 \u00B7 \u03C0 = 30\u00B0" },
  { key: "45", description: "1/4 \u00B7 \u03C0 = 45\u00B0" },
  { key: "60", description: "1/3 \u00B7 \u03C0 = 60\u00B0" },
  { key: "75", description: "5/12 \u00B7 \u03C0 = 75\u00B0" },
  { key: "90", description: "1/2 \u00B7 \u03C0 = 90\u00B0" },
  { key: "105", description: "7/12 \u00B7 \u03C0 = 105\u00B0" },
  { key: "120", description: "2/3 \u00B7 \u03C0 = 120\u00B0" },
  { key: "135", description: "3/4 \u00B7 \u03C0 = 135\u00B0" },
  { key: "150", description: "5/6 \u00B7 \u03C0 = 150\u00B0" },
  { key: "165", description: "11/12 \u00B7 \u03C0 = 165\u00B0" },
  { key: "180", description: "\u00B7 \u03C0 = 180\u00B0" },
];
const columns_display = [
  { key: "15", description: "1/12 \u00B7 \u03C0 = 15\u00B0" },
  { key: "30", description: "1/6 \u00B7 \u03C0 = 30\u00B0" },
  { key: "45", description: "1/4 \u00B7 \u03C0 = 45\u00B0" },
  { key: "60", description: "1/3 \u00B7 \u03C0 = 60\u00B0" },
];

type rowType = keyof {
  "15": number;
  "30": number;
  "45": number;
  "60": number;
  "75": number;
  "90": number;
  "105": number;
  "120": number;
  "135": number;
  "150": number;
  "165": number;
  "180": number;
};

const ModelsRangeAngle = (props: {
  dataset: datasetModels[];
  models: string[];
}) => {
  const [angleColumn, setAngleColumn] = useState<any>();
  const [dataStatistic, setDataStatistic] = useState<any>([]);
  const [csvData, setCsvData] = useState<datasetModels[]>([]);

  useEffect(() => {
    handleChange(columns_display);

    let x = props.models.map((model: string, index) => {
      return makeStatisticOfMCQvalue(model, index);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setDataStatistic(x);
    setCsvData(x);
  }, [props.models]);

  const makeStatisticOfMCQvalue = (model: string, index: number) => {
    let temp = {
      name: model,
      key: index,
      "15": 0,
      "30": 0,
      "45": 0,
      "60": 0,
      "75": 0,
      "90": 0,
      "105": 0,
      "120": 0,
      "135": 0,
      "150": 0,
      "165": 0,
      "180": 0,
    };
    for (let i = 0; i < props.dataset.length; i++) {
      let value = props.dataset[i][model];
      if (typeof value === "number" && value !== null) {
        let index = Math.floor(value / 15);
        let key_value = columns[index].key;
        temp[key_value as rowType] = (temp[key_value as rowType] || 0) + 1;
      }
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      let x = 0;
      if (temp[columns[i].key as rowType] != undefined) {
        x = temp[columns[i].key as rowType];
      }
      temp[columns[i].key as rowType] = +(
        ((x + sum) * 100) /
        props.dataset.length
      ).toFixed(2);
      sum = sum + x;
    }
    return temp;
  };

  const handleChange = (value: { key: string; description: string }[]) => {
    let x: TableColumnsType = value.map(
      (e: { key: string; description: string }, index: number) => ({
        title: `cutoff: ${e.description}`,
        key: index + 1,
        dataIndex: e.key,
        width: 30,
        fixed: false,
        render: (e: string) => <p className={styles.tableAngleMono}>{e}</p>,
      })
    );
    x.splice(0, 0, {
      title: "Model",
      key: 0,
      dataIndex: "name",
      width: 30,
      fixed: "left",
      render: (name: any) => <p className={styles.tableAngleResidue}>{name}</p>,
    });
    setAngleColumn(x);
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>
        Percentage of residues with MCQ &lt; cutoff
      </h2>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={angleColumn}
        dataSource={dataStatistic}
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
              angleColumn as [any],
              "percentage",
              "of_MCQ_Ranges"
            )
          }
        >
          Download .csv
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default ModelsRangeAngle;
