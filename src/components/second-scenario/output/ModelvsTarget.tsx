"use client";
import styles from "../../first-scenario/first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select, Button, Checkbox } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../../utils/exportDataToCSV";
import type { GetProp } from "antd";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

type datasetModels = {
  [key: string]: string | number | null;
};
const example: { [key: string]: any }[] = [
  {
    name: "A.G1",
    key: 0,
    zeta: 24.76,
    eta: 31.82,
    chi: 23.03,
    mcq: 36.2,
  },
  {
    name: "A.C2",
    key: 1,
    zeta: 17.15,
    eta: 4.75,
    chi: 9.63,
    mcq: 22.77,
  },
  {
    name: "A.G3",
    key: 2,

    zeta: 3.71,
    eta: 4.05,
    chi: 6.7,
    mcq: 8.86,
  },
  {
    name: "A.G4",
    key: 3,

    zeta: 3.88,
    eta: 1.25,
    chi: 6.12,
    mcq: 3.62,
  },
  {
    name: "A.A5",
    key: 4,

    zeta: 15.43,
    eta: 2.12,
    chi: 11.98,
    mcq: 5.08,
  },
  {
    name: "A.U6",
    key: 5,

    zeta: 1.09,
    eta: 1.52,
    chi: 5.32,
    mcq: 6.75,
  },
  {
    name: "A.U7",
    key: 6,

    zeta: 3.43,
    eta: 1.43,
    chi: 1.94,
    mcq: 3.94,
  },
  {
    name: "A.U8",
    key: 7,
    zeta: 5.79,
    eta: 2.51,
    chi: 2.15,
    mcq: 4.43,
  },
  {
    name: "A.A9",
    key: 8,
    zeta: 3.61,
    eta: 1.99,
    chi: 5.94,
    mcq: 5.16,
  },
  {
    name: "A.G10",
    key: 20,
    zeta: 12.47,
    eta: 2.55,
    chi: 5.4,
    mcq: 5.4,
  },
  {
    name: "A.C11",
    key: 9,
    zeta: 12.47,
    eta: 3.16,
    chi: 4.21,
    mcq: 6.46,
  },
  {
    name: "A.U12",
    key: 10,
    zeta: 1.3,
    eta: 2.36,
    chi: 2.91,
    mcq: 2.9,
  },
  {
    name: "A.C13",
    key: 11,
    zeta: 8.22,
    eta: 1.08,
    chi: 10.21,
    mcq: 12.44,
  },
  {
    name: "A.A14",
    key: 12,
    zeta: 8.16,
    eta: 0.22,
    chi: 8.31,
    mcq: 16.68,
  },
  {
    name: "A.G15",
    key: 13,
    zeta: 16.72,
    eta: 11.65,
    chi: 11.98,
    mcq: 5.47,
  },
  {
    name: "A.U16",
    key: 14,
    zeta: 39.95,
    eta: 50.85,
    chi: 34.02,
    mcq: 78.5,
  },
  {
    name: "A.U17",
    key: 15,
    zeta: 155.47,
    eta: 16.5,
    chi: 39.02,
    mcq: 96.32,
  },
  {
    name: "A.G18",
    key: 16,
    zeta: 0.4,
    eta: 17.89,
    chi: 3.99,
    mcq: 39.55,
  },
  {
    name: "A.G19",
    key: 17,
    zeta: 0.63,
    eta: 3.82,
    chi: 0.62,
    mcq: 3.22,
  },
  {
    name: "A.G20",
    key: 18,
    zeta: 13.18,
    eta: 4.5,
    chi: 1.42,
    mcq: 8.24,
  },
];

const initcolumns = ["zeta", "eta", "chi", "mcq"];

const ModelvsTarget = (props: {
  dataset: datasetModels[];
  models: string[];
}) => {
  const [column, setColumn] = useState<any>();
  const [csvData, setCsvData] = useState<datasetModels[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    // handleChange(props.models);
    handleChange(initcolumns);
    // setCsvData(props.dataset);
    setSelectedRowKeys(Array.from(Array(example.length).keys()));
    console.log(props.dataset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e, index) => ({
      title: e,
      key: index + 1,
      dataIndex: e,
      width: 30,
      render: (e: string) => <p className={styles.tableAngleMono}>{e}</p>,
    }));
    x.splice(0, 0, {
      title: "Residue",
      key: 0,
      dataIndex: "name",
      width: 30,
      fixed: "left",
      render: (name: any) => <p className={styles.tableAngleResidue}>{name}</p>,
    });
    setColumn(x);
  };

  const handleOnChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    // setCsvData(selectedRows);
  };

  const rowSelection: TableRowSelection<datasetModels> = {
    columnWidth: "10px",
    selectedRowKeys,
    onChange: handleOnChange,
  };

  return (
    <div style={{ width: "100%" }}>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={column}
        rowSelection={rowSelection}
        rowClassName={styles.rowStyle}
        dataSource={example}
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
              column,
              "test",
              "test"
            )
          }
        >
          Download .csv
        </Button>
      </div>
    </div>
  );
};

export default ModelvsTarget;
