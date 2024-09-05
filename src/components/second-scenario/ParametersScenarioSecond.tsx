"use client";
import {
  InputNumber,
  Slider,
  Row,
  Col,
  Divider,
  Checkbox,
  SliderSingleProps,
  CheckboxProps,
  GetProp,
  InputNumberProps,
} from "antd";
import { second_scenario_submit } from "@/types/modelsType";
import { useState } from "react";
import angles from "../../json/angles.json";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const initAngles = [
  "ALPHA",
  "BETA",
  "GAMMA",
  "DELTA",
  "EPSILON",
  "ZETA",
  "ETA",
  "ETA_PRIM",
  "THETA",
  "THETA_PRIM",
  "CHI",
];

const marks: SliderSingleProps["marks"] = {
  0: "0°",
  15: "15°",
  180: "180°",
};

const ParametersScenarioSecond = (props: {
  params: second_scenario_submit;
  setParams: any;
}) => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(initAngles);
  const checkAll = Object.keys(angles).length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < initAngles.length;

  const onChang = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    props.setParams({ ...props.params, angles: list });
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? initAngles : []);
    props.setParams({
      ...props.params,
      angles: e.target.checked ? initAngles : [],
    });
  };

  const changeMCQ: InputNumberProps["onChange"] = (newValue) => {
    props.setParams({ ...props.params, threshold: newValue as number });
  };

  return (
    <div style={{ width: "100%" }}>
      <Divider orientation="left">Select torsion angles to compute MCQ</Divider>
      <Col
        style={{
          margin: "30px 50px 30px 50px",
          display: "flex",
          rowGap: "15px",
          flexDirection: "column",
        }}
      >
        <Row>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </Row>
        <Row>
          <CheckboxGroup
            options={angles}
            value={checkedList}
            onChange={onChang}
          />
        </Row>
      </Col>
      <Divider orientation="left">
        Select MCQ threshold to compute LCS-TA
      </Divider>
      <Row style={{ margin: "30px 50px 30px 50px" }}>
        <Col span={3} style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: 0 }}>MCQ threshold:</p>
        </Col>
        <Col span={2} style={{ display: "flex", alignItems: "center" }}>
          <InputNumber
            min={0}
            max={180}
            style={{ width: "90%" }}
            value={props.params.threshold}
            onChange={changeMCQ}
          />
        </Col>
        <Col span={10}>
          <Slider
            min={0}
            max={180}
            marks={marks}
            onChange={changeMCQ}
            value={props.params.threshold}
          />
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default ParametersScenarioSecond;
