"use client";

import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useEffect, useState } from "react";
import styles from "../first-scenario/first-scenario.module.css";

interface DataType {
  [key: string]: string | number | null;
}
type datasetModels = {
  [key: string]: string | number | null;
};

const ModelsMatrix = (props: { models: string[]; dataset: any[] }) => {
  const [column, setColumn] = useState<any>();
  const [csvData, setCsvData] = useState<datasetModels[]>([]);

  useEffect(() => {
    let models = props.dataset.map((model) => ({ model: model.name }));

    handleChange(props.models);
    // setCsvData(props.dataset);
    // setSelectedRowKeys(Array.from(Array(props.dataset.length).keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.models]);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType = value.map((e, index) => ({
      title: e,
      key: index + 1,
      dataIndex: e,
      width: 30,
      render: (e: string) => <p className={styles.tableAngleMono}>{e}</p>,
    }));
    x.splice(0, 0, {
      title: "Models",
      key: 0,
      dataIndex: "name",
      width: 30,
      fixed: "left",
      rowScope: "row",
    });
    setColumn(x);
  };

  return <Table columns={column} dataSource={props.dataset} bordered />;
};

export default ModelsMatrix;
