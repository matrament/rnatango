"use client";
import styles from "./first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select, Button, Checkbox, Tag, Tooltip } from "antd";
import { torsion_angles_residue } from "../../types/modelsType";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../utils/exportDataToCSV";
import type { GetProp } from "antd";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const angleName: { [key: string]: string } = {
  ["1-alpha"]: "Alpha (\u03B1) [\u00B0]",

  ["2-beta"]: "Beta (\u03B2) [\u00B0]",

  ["3-gamma"]: "Gamma (\u03B3) [\u00B0]",

  ["4-delta"]: "Delta (\u03B4) [\u00B0]",

  ["5-epsilon"]: "Epsilon (\u03B5) [\u00B0]",

  ["6-zeta"]: "Zeta (\u03B6) [\u00B0]",

  ["7-eta"]: "Eta (\u03B7) [\u00B0]",

  ["8-theta"]: "Theta (\u03B8) [\u00B0]",

  ["9-eta_prim"]: "Eta prim (\u03B7') [\u00B0]",

  ["10-theta_prim"]: "Theta prim (\u03B8') [\u00B0]",

  ["11-chi"]: "Chi (\u03C7) [\u00B0]",

  ["12-p"]: "P  [\u00B0]",
};

const P_angle_label = {
  0: { name: "C3'-exo", color: "volcano" },
  1: { name: "C4'-endo", color: "cyan" },
  2: { name: "O4'-exo", color: "volcano" },
  3: { name: "C1'-endo", color: "cyan" },
  4: { name: "C2'-exo", color: "volcano" },
  5: { name: "C3'-endo", color: "cyan" },
  6: { name: "C4'-exo", color: "volcano" },
  7: { name: "O4'-endo", color: "cyan" },
  8: { name: "C1'-exo", color: "volcano" },
  9: { name: "C2'-endo", color: "cyan" },
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
    label: "Alpha (\u03B1)",
    value: "1-alpha",
  },
  {
    label: "Beta (\u03B2)",
    value: "2-beta",
  },
  {
    label: "Gamma (\u03B3)",
    value: "3-gamma",
  },
  {
    label: "Delta (\u03B4)",
    value: "4-delta",
  },
  {
    label: "Epsilon (\u03B5)",
    value: "5-epsilon",
  },
  {
    label: "Zeta (\u03B6)",
    value: "6-zeta",
  },
  {
    label: "Eta (\u03B7)",
    value: "7-eta",
  },
  {
    label: "Theta (\u03B8)",
    value: "8-theta",
  },
  {
    label: "Eta prim (\u03B7')",
    value: "9-eta_prim",
  },
  {
    label: "Theta prim (\u03B8')",
    value: "10-theta_prim",
  },
  {
    label: "Chi (\u03C7)",
    value: "11-chi",
  },
  {
    label: "P",
    value: "12-p",
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
  const [selectedAngles, setSelectedAngles] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<torsion_angles_residue[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    handleChange(Object.keys(angleName));
    setSelectedAngles(Object.keys(angleName));
    setCsvData(props.dataAngle);
    setSelectedRowKeys(Array.from(Array(props.dataAngle.length).keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string[]) => {
    value.sort((a, b) => {
      const numA = parseInt(a.split("-")[0], 10);
      const numB = parseInt(b.split("-")[0], 10);
      return numA - numB;
    });

    setSelectedAngles(value);

    let x: TableColumnsType<tableAngle> = value.map((e) => {
      const [key, dataIndex] = e.split("-");

      if (dataIndex === "p") {
        return {
          title: <p style={{ whiteSpace: "nowrap" }}>{`P [\u00B0]`}</p>,
          key: parseInt(key),
          dataIndex: dataIndex,
          width: 50,
          fixed: true,
          render: (value: string) => {
            if (e != null) {
              const label =
                P_angle_label[
                  Math.floor(
                    (Number(value) + 180) / 36
                  ) as keyof typeof P_angle_label
                ];
              return (
                <>
                  <p className={styles.tableAngleMono}>{value}</p>
                  <Tag color={label.color}>{label.name}</Tag>
                </>
              );
            } else {
              null;
            }
          },
        };
      }

      // Domyślna konfiguracja, jeśli value nie jest równe "p"
      return {
        title: (
          <p style={{ whiteSpace: "nowrap" }}>{`${
            angleName[e][0].toUpperCase() + angleName[e].slice(1)
          }`}</p>
        ),
        key: parseInt(key),
        dataIndex: dataIndex,
        width: 30,
        fixed: false,
        render: (e: string) => {
          return <p className={styles.tableAngleMono}>{e}</p>;
        },
      };
    });
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
                  Show/hide column:
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    options={options}
                    value={selectedAngles}
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
                  size="small"
                  bordered
                  pagination={{ position: ["bottomCenter"] }}
                  scroll={{ x: true }}
                />
                <div className={styles.downloadButton}>
                  <Tooltip title="The file will contain selected rows & columns">
                    <Button
                      type="primary"
                      shape="round"
                      icon={<DownloadOutlined />}
                      onClick={() =>
                        exportDataToCSV(
                          csvData.sort((a: any, b: any) => a.key - b.key),
                          angleColumn,
                          `${props.fileName}_${props.chain.toUpperCase()}`,
                          "_angles"
                        )
                      }
                    >
                      Download .csv
                    </Button>
                  </Tooltip>
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
