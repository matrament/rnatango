import styles from "./first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Collapse, Select } from "antd";
import { torsion_angles_residue } from "@/types/modelsType";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T> = TableProps<T>["rowSelection"];
const angleName: { [key: string]: string } = {
  ["alpha"]: "alpha (\u03B1)",

  ["beta"]: "beta (\u03B2)",

  ["gamma"]: "gamma (\u03B3)",

  ["delta"]: "delta (\u03B4)",

  ["epsilon"]: "epsilon (\u03B5)",

  ["zeta"]: "zeta (\u03B6)",

  ["eta"]: "eta (\u03B7)",

  ["theta"]: "theta (\u03B8)",

  ["eta_prim"]: "eta prim (\u03B7')",

  ["theta_prim"]: "theta prim (\u03B8')",

  ["chi"]: "chi (\u03C7)",
};

interface tableAngle {
  title: string;
  key: string;
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
    value: "alpha",
  },
  {
    label: "beta (\u03B2)",
    value: "beta",
  },
  {
    label: "gamma (\u03B3)",
    value: "gamma",
  },
  {
    label: "delta (\u03B4)",
    value: "delta",
  },
  {
    label: "epsilon (\u03B5)",
    value: "epsilon",
  },
  {
    label: "zeta (\u03B6)",
    value: "zeta",
  },
  {
    label: "eta (\u03B7)",
    value: "eta",
  },
  {
    label: "theta (\u03B8)",
    value: "theta",
  },
  {
    label: "eta prim (\u03B7')",
    value: "eta_prim",
  },
  {
    label: "theta prim (\u03B8')",
    value: "theta_prim",
  },
  {
    label: "chi (\u03C7)",
    value: "chi",
  },
];

const ResultTable = (props: {
  dataAngle: torsion_angles_residue[];
  chain: string;
  sequence: string;
  indexChain: number;
  selectRows: any;
  setSelectRows: any;
}) => {
  const [angleColumn, setAngleColumn] = useState<any>();
  const [resultResidues, setResultResidues] =
    useState<torsion_angles_residue[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    handleChange(Object.keys(angleName));
  }, []);

  useEffect(() => {
    setSelectedRowKeys(Array.from(Array(props.dataAngle.length).keys()));
  }, []);

  const handleChange = (value: string[]) => {
    let x: TableColumnsType<tableAngle> = value.map((e) => ({
      title: angleName[e],
      key: e,
      dataIndex: e,
      width: 30,
      fixed: false,
      render: (e) => <p className={styles.tableAngleMono}>{e}</p>,
    }));
    x.splice(0, 0, {
      title: "Residue",
      key: "name",
      dataIndex: "name",
      width: 30,
      fixed: "left",
      render: (name) => <p className={styles.tableAngleResidue}>{name}</p>,
    });
    setAngleColumn(x);
  };
  // FIXME: zmienic zawartosc tabeli na monospace i tam gdzie nie ma minusa dac spacje
  // TODO: czy kolejnosc katow w tabeli jest istotna? jesli tak poprawic przy selekcie

  const handleOnChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    props.setSelectRows({
      ...props.selectRows,
      [props.indexChain]: selectedRows,
    });
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
            label: `Chain: ${props.chain}, ${props.sequence}`,
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
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default ResultTable;
