"use client";

import { Button, Divider, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";

import styles from "../first-scenario/first-scenario.module.css";
import { exportDataToCSV } from "@/utils/exportDataToCSV";
type TableRowSelection<T> = TableProps<T>["rowSelection"];

type datasetModels = {
  [key: string]: string | number | null;
};

const ModelsMatrix = (props: {
  models: string[];
  dataset: any[];
  setModelSelection: any;
}) => {
  const [column, setColumn] = useState<any>();
  const [csvData, setCsvData] = useState<datasetModels[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    let models = props.dataset.map((model) => model.name);

    handleChange(models);
    setCsvData(props.dataset);

    setSelectedRowKeys(Array.from(Array(props.dataset.length).keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataset]);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e, index) => ({
      title: e,
      key: index + 1,
      dataIndex: e,
      width: 50,
      render: (e: string) => {
        if (e != null) {
          let text = e.split(",");
          return (
            <>
              <p
                style={{ whiteSpace: "nowrap" }}
                className={styles.tableAngleMono}
              >{`MCQ: ${text[0]}\u00B0`}</p>
              <p
                style={{ whiteSpace: "nowrap" }}
                className={styles.tableAngleMono}
              >{`LCS: ${text[1]}%`}</p>
            </>
          );
        } else return null;
      },
    }));
    x.splice(0, 0, {
      title: "Models",
      key: 0,
      dataIndex: "name",
      width: 20,
      fixed: "left",
      rowScope: "row",
      ellipsis: true,
    });
    setColumn(x);
  };

  const handleOnChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    props.setModelSelection(newSelectedRowKeys[0]);
  };

  const rowSelection: TableRowSelection<datasetModels> = {
    columnWidth: "10px",

    selectedRowKeys,
    onChange: handleOnChange,
  };

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Model vs Model</h1>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={column}
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        // rowClassName={styles.rowStyle}
        dataSource={props.dataset}
        bordered
        size="small"
        pagination={false}
        scroll={{ x: true }}
      />

      <div className={styles.tableButton}>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() =>
            exportDataToCSV(csvData, column, "models_vs_models", "data")
          }
        >
          Download .csv
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default ModelsMatrix;
