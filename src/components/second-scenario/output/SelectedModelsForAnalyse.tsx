"use client";
import { Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { PaperClipOutlined } from "@ant-design/icons";

const SelectedModelsForAnalyse = (props: {
  models: { [key: number]: string }[];
  setSelectedModels: any;
  selectedModels: string[];
  targetFileName: string;
}) => {
  // useEffect(() => {
  //   console.log(props.selectedModels);
  //   console.log(props.models);
  // }, [props.selectedModels]);

  const onChange = (value: string[]) => {
    props.setSelectedModels(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: "40px 50px 10px 50px" }}>
        <p>
          <b>Target file name: </b> {props.targetFileName}
        </p>
        <p>
          <b>Select Model(s) for analysis: </b>
        </p>

        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={props.models.map((model, index) => {
            return {
              label: Object.values(model)[0],
              value: Object.values(model)[0],
            };
          })}
          defaultValue={props.selectedModels}
          onChange={onChange}
          placeholder="Select Item..."
          maxTagCount="responsive"
        />
      </div>
    </div>
  );
};

export default SelectedModelsForAnalyse;
