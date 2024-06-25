"use client";
import styles from "./first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select, Button, Checkbox } from "antd";
import { torsion_angles_residue } from "../../types/modelsType";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../utils/exportDataToCSV";
import type {GetProp } from "antd";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const angleName: { [key: string]: string } = {
  ["1-alpha"]: "alpha (\u03B1)",

  ["2-beta"]: "beta (\u03B2)",

  ["3-gamma"]: "gamma (\u03B3)",

  ["4-delta"]: "delta (\u03B4)",

  ["5-epsilon"]: "epsilon (\u03B5)",

  ["6-zeta"]: "zeta (\u03B6)",

  ["7-eta"]: "eta (\u03B7)",

  ["8-theta"]: "theta (\u03B8)",

  ["9-eta_prim"]: "eta prim (\u03B7')",

  ["10-theta_prim"]: "theta prim (\u03B8')",

  ["11-chi"]: "chi (\u03C7)",
};

interface tableAngle {
  title: string;
  key: number;
  dataIndex: string;
  width: number;
  fixed: any;
}

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [
  {
    label: "alpha (\u03B1)",
    value: "1-alpha",
  },
  {
    label: "beta (\u03B2)",
    value: "2-beta",
  },
  {
    label: "gamma (\u03B3)",
    value: "3-gamma",
  },
  {
    label: "delta (\u03B4)",
    value: "4-delta",
  },
  {
    label: "zeta (\u03B6)",
    value: "6-zeta",
  },
  {
    label: "eta (\u03B7)",
    value: "7-eta",
  },
  {
    label: "theta (\u03B8)",
    value: "8-theta",
  },
  {
    label: "eta prim (\u03B7')",
    value: "9-eta_prim",
  },
  {
    label: "theta prim (\u03B8')",
    value: "10-theta_prim",
  },
  {
    label: "chi (\u03C7)",
    value: "11-chi",
  },
];

const ResultTable = (props: {
  dataAngle: torsion_angles_residue[];
  chain: string;
  sequence: string;
  indexChain: number;
  selectedRows: any;
  setSelectedRows: any;
  fileName: string;
}) => {
  const [angleColumn, setAngleColumn] = useState<any>();
  const [csvData, setCsvData] = useState<torsion_angles_residue[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    handleChange(Object.keys(angleName));
    setCsvData(props.dataAngle);
    setSelectedRowKeys(Array.from(Array(props.dataAngle.length).keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(
    Object.values(angleName)
  );

  const handleChange = (value: string[]) => {
    let x: TableColumnsType<tableAngle> = value.map((e) => ({
      title: angleName[e],
      key: parseInt(e.split("-")[0]),
      dataIndex: e.split("-")[1],
      width: 30,
      fixed: false,
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
    setAngleColumn(x.sort((a: any, b: any) => a.key - b.key));
  };

  const handleOnChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    props.setSelectedRows({
      ...props.selectedRows,
      [props.indexChain]: selectedRows,
    });
    setCsvData(selectedRows);
  };

  const rowSelection: TableRowSelection<torsion_angles_residue> = {
    columnWidth: "10px",
    selectedRowKeys,
    onChange: handleOnChange,
  };

  return (
    <>
      <Collapse
        style={{ width: "100%" }}
        items={[
          {
            key: "1",
            label: (
              <>
                <div className={styles.chainTitle}>Chain: {props.chain}</div>
                <div className={styles.sequenceText}>
                  {props.sequence.toUpperCase()}
                </div>
              </>
            ),
            children: (
              <div>
                <div style={{ padding: "10px" }}>
                  Select/deselect column:
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    options={options}
                    defaultValue={Object.keys(angleName)}
                    onChange={handleChange}
                    placeholder="Select Item..."
                    maxTagCount="responsive"
                  />
                </div>
                <Table
                  columns={angleColumn}
                  rowSelection={rowSelection}
                  rowClassName={styles.rowStyle}
                  dataSource={props.dataAngle}
                  size="middle"
                  bordered
                  pagination={{ position: ["bottomCenter"] }}
                  scroll={{ x: "calc(1600px)", y: 2000 }}
                />
                <div className={styles.downloadButton}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    onClick={() =>
                      exportDataToCSV(
                        csvData.sort((a: any, b: any) => a.key - b.key),
                        angleColumn,
                        props.fileName,
                        props.chain
                      )
                    }
                  >
                    Download .csv
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default ResultTable;
