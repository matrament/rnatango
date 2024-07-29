"use client";
import styles from "../../first-scenario/first-scenario.module.css";
import { Button, Divider, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportDataToCSV } from "../../../utils/exportDataToCSV";
import { useEffect, useState } from "react";

type datasetModels = {
  [key: string]: string | number | null;
};

const GlobalMCQ = (props: { dataset: datasetModels; models: string[] }) => {
  const [column, setColumn] = useState<any>();
  const [csvData, setCsvData] = useState<datasetModels[]>([]);

  useEffect(() => {
    handleChange(props.models);
    setCsvData([props.dataset]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.models]);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e, index) => ({
      title: e,
      key: index,
      dataIndex: e,
      width: 30,
      render: (e: string) => (
        <p className={styles.tableAngleMono}>{`${e}\u00B0`}</p>
      ),
    }));
    setColumn(x);
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Global MCQ values</h2>
      <Table
        style={{ marginLeft: "30px", marginRight: "30px" }}
        columns={column}
        dataSource={[props.dataset]}
        size="middle"
        bordered
        pagination={false}
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
              "table",
              "global_MCQ_values"
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

export default GlobalMCQ;
