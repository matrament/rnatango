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

const exampleData: { [key: string]: number | string }[] = [
  { ["name"]: "A.G1", ["4TNA"]: 7.92, ["1EVV"]: 1.44 },
  { ["name"]: "A.C2", ["4TNA"]: 7.92, ["1EVV"]: 1.44 },
];

interface tableAngle {
  title: string;
  key: number;
  dataIndex: string;
  width: number;
  fixed: any;
}

const ModelsRangeAngle = () => {
  const [angleColumn, setAngleColumn] = useState<any>();
  //   const [csvData, setCsvData] = useState<torsion_angles_residue[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    handleChange(["4TNA", "1EVV"]);
    // setCsvData(props.dataAngle);
    // setSelectedRowKeys(Array.from(Array(props.dataAngle.length).keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e, index) => ({
      title: e,
      key: index + 1,
      dataIndex: e,
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
    <>
      <Collapse
        style={{ width: "100%" }}
        items={[
          {
            key: "1",
            label: (
              <>
                <div className={styles.chainTitle}>name</div>
              </>
            ),
            children: (
              <div>
                <Table
                  columns={angleColumn}
                  //   rowSelection={rowSelection}
                  rowClassName={styles.rowStyle}
                  dataSource={exampleData}
                  size="middle"
                  bordered
                  pagination={{ position: ["bottomCenter"] }}
                  scroll={{ y: 2000 }}
                />
                <div className={styles.downloadButton}>
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
            ),
          },
        ]}
      />
    </>
  );
};

export default ModelsRangeAngle;
