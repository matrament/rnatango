"use client";
import styles from "../../first-scenario/first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select, Button, Checkbox } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../../utils/exportDataToCSV";
import type { GetProp } from "antd";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

type TableRowSelection<T> = TableProps<T>["rowSelection"];

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

const columns: datasetModels = {
  0: "1/12 \u00B7 \u03C0 = 15\u00B0",
  1: "1/6 \u00B7 \u03C0 = 30\u00B0",
  2: "1/4 \u00B7 \u03C0 = 45\u00B0",
  3: "1/3 \u00B7 \u03C0 = 60\u00B0",
};

const obiekty = [
  { at: 3, dt: 5 },
  { at: 3, dt: 5 },
];

const ModelsRangeAngle = (props: {
  dataset: datasetModels[];
  models: string[];
}) => {
  const [angleColumn, setAngleColumn] = useState<any>();
  const [dataStatistic, setDataStatistic] = useState<any>([]);
  //   const [csvData, setCsvData] = useState<torsion_angles_residue[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    handleChange(Object.keys(columns));

    let x = props.models.map((model: string, index) => {
      return makeStatisticOfMCQvalue(model, index);
    });
    // setCsvData(props.dataAngle);
    // setSelectedRowKeys(Array.from(Array(props.dataAngle.length).keys()));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setDataStatistic(x);
    console.log(x);
  }, [props.models]);

  const makeStatisticOfMCQvalue = (model: string, index: number) => {
    let temp: { [key: number]: number; name: string; key: number } = {
      name: model,
      key: index,
    };
    for (let i = 0; i < props.dataset.length; i++) {
      let value = props.dataset[i][model];
      if (typeof value === "number" && value !== null) {
        let index = Math.floor(value / 15);
        temp[index] = (temp[index] || 0) + 1;
      }
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      let x = 0;
      if (temp[i] != undefined) {
        x = temp[i];
      }
      temp[i] = +(((x + sum) * 100) / props.dataset.length).toFixed(2);
      sum = sum + x;
    }
    return temp;
  };

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e: string, index) => ({
      title: columns[e],
      key: index + 1,
      dataIndex: e,
      width: 30,
      fixed: false,
      render: (e: string) => <p className={styles.tableAngleMono}>{e}</p>,
    }));
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

  //   const handleOnChange = (
  //     newSelectedRowKeys: React.Key[],
  //     selectedRows: any
  //   ) => {
  //     setSelectedRowKeys(newSelectedRowKeys);
  //     props.setSelectedRows({
  //       ...props.selectedRows,
  //       [props.indexChain]: selectedRows,
  //     });
  //     // setCsvData(selectedRows);
  //   };

  //   const rowSelection: TableRowSelection<torsion_angles_residue> = {
  //     columnWidth: "10px",
  //     selectedRowKeys,
  //     onChange: handleOnChange,
  //   };

  return (
    <div style={{ width: "100%" }}>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={angleColumn}
        //   rowSelection={rowSelection}
        rowClassName={styles.rowStyle}
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
          // onClick={() =>
          //   exportDataToCSV(
          //     csvData.sort((a: any, b: any) => a.key - b.key),
          //     angleColumn,
          //     props.fileName,
          //     props.chain
          //   )
          // }
        >
          Download .csv
        </Button>
      </div>
    </div>
  );
};

export default ModelsRangeAngle;
