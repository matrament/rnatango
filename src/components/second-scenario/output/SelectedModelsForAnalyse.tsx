"use client";
import { Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { PaperClipOutlined } from "@ant-design/icons";

const SelectedModelsForAnalyse = (props: {
  models: { [key: number]: string }[];
  setSelectedModels: any;
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  //   useEffect(() => {
  //     let temp: string[] = props.models.map((model) => {
  //       return Object.values(model)[0];
  //     });
  //     setSelectedModels(temp);
  //   }, [selectedModels]);

  const onChange = (value: string[]) => {
    props.setSelectedModels(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: "30px 50px 30px 50px" }}>
        <p>Models: </p>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={props.models.map((model) => {
            return {
              label: Object.values(model)[0],
              value: Object.values(model)[0],
            };
          })}
          defaultValue={selectedModels}
          onChange={onChange}
          placeholder="Select Item..."
          maxTagCount="responsive"
        />
      </div>
    </div>
  );
};

export default SelectedModelsForAnalyse;
