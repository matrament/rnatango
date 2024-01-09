import styles from "./first-scenario.module.css";
import { useState, useEffect } from "react";
import { Table, Button, Collapse, Select } from "antd";
import { torsion_angles_residue } from "@/types/modelsType";
import type { ColumnsType } from "antd/es/table";
import type { SelectProps } from "antd";
import result from "./result.json";
import { DownOutlined, UpOutlined, DownloadOutlined } from "@ant-design/icons";

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

const data: torsion_angles_residue[] = [];

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
}) => {
  const [angleColumn, setAngleColumn] = useState<any>();
  const [resultResidues, setResultResidues] =
    useState<torsion_angles_residue[]>();

  useEffect(() => {
    handleChange(Object.keys(angleName));
  }, []);

  const handleChange = (value: string[]) => {
    let x: tableAngle[] = value.map((e) => ({
      title: angleName[e],
      key: e,
      dataIndex: e,
      width: 30,
      fixed: false,
    }));
    x.splice(0, 0, {
      title: "Residue",
      key: "name",
      dataIndex: "name",
      width: 30,
      fixed: "left",
    });
    setAngleColumn(x);
    console.log(angleName["alpha"]);
  };
  // FIXME: zmienic zawartosc tabeli na monospace i tam gdzie nie ma misusa dac spacje
  return (
    <>
      <Collapse
        style={{ width: "100%" }}
        items={[
          {
            key: "1",
            label: `Chain: ${props.chain}, Sequence: ${props.sequence}`,
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
