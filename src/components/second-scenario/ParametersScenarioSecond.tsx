"use client";
import { InputNumber, Space } from "antd";
import type { InputNumberProps } from "antd";
import { Divider, Checkbox } from "antd";
import { useState } from "react";

import type { CheckboxProps, GetProp } from "antd";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "hsa-mir-21",
  "hsa-mir-30a",
  "hsa-mir-33a",
  "hsa-mir-122",
  "hsa-mir-135b",
  "hsa-mir-136-v1",
  "hsa-mir-155",
  "hsa-mir-203a",
];

const initParam = {
  mcq: 15,
  torsionAngles: ['alpha', 'beta', 'gamma']
}

const changeMCQ: InputNumberProps["onChange"] = (value) => {
  console.log("changed", value);
};

const ParametersScenarioSecond = () => {
  const [parameters, setParameters] = useState<any>({})
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(plainOptions);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChang = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <div>
      <p>Define parameters</p>

      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChang}
      />
      <p>MCQ threshold:</p>
      <InputNumber min={0} max={180} defaultValue={15} onChange={changeMCQ} />
    </div>
  );
};

export default ParametersScenarioSecond;
