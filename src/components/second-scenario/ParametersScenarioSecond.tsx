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
import { SelectOutlined } from "@ant-design/icons";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const initAngles = [
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "eta prim",
  "theta_prim",
  "chi",
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
    <div>
      <Divider orientation="left">
        Select torsion angles for MCQ? analysis <SelectOutlined style={{ color: "#04afa4" }}/>
      </Divider>
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
        LCS-TA: <SelectOutlined style={{ color: "#04afa4" }} />
      </Divider>
      <Row style={{ margin: "30px 50px 30px 50px" }}>
        <Col span={3}>
          <p>MCQ threshold:</p>
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
        <Col span={4}>
          <InputNumber
            min={0}
            max={180}
            style={{ margin: "0 25px" }}
            value={props.params.threshold}
            onChange={changeMCQ}
          />
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default ParametersScenarioSecond;
