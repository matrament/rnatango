"use client";
import styles from "../../first-scenario/first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select, Button, Divider } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../../utils/exportDataToCSV";
import { second_scenario_result_dataset_single_model } from "@/types/modelsType";
import angles_description from "../../../json/angles_description.json";
import { angles_result } from "../../../types/modelsType";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

type datasetModels = {
  [key: string]: string | number | null;
};

const ModelvsTarget = (props: {
  dataset: second_scenario_result_dataset_single_model[];
  requestedAngles: string[];
  model: string;
}) => {
  const [column, setColumn] = useState<any>();
  const [csvData, setCsvData] = useState<datasetModels[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    handleChange(props.requestedAngles);
    setCsvData(props.dataset);
    setSelectedRowKeys(Array.from(Array(props.dataset.length).keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataset, props.requestedAngles]);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e, index) => ({
      title: `${
        angles_description[e.toLowerCase() as keyof angles_result]
      } [\u00B0]`,
      key: index + 1,
      dataIndex: `${e.toLowerCase()}`,
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
    setCsvData(selectedRows);
  };

  const rowSelection: TableRowSelection<second_scenario_result_dataset_single_model> =
    {
      columnWidth: "10px",
      selectedRowKeys,
      onChange: handleOnChange,
    };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center" }}></h2>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={column}
        rowSelection={rowSelection}
        rowClassName={styles.rowStyle}
        dataSource={props.dataset}
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
      <Divider />
    </div>
  );
};

export default ModelvsTarget;
