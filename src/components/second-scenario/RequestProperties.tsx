import { useState } from "react";
import { Checkbox, Divider, Flex } from "antd";
import type { CheckboxProps, GetProp } from "antd";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "alpha (\u03B1)",
  "beta (\u03B2)",
  "gamma (\u03B3)",
  "delta (\u03B4)",
  "epsilon (\u03B5)",
  "zeta (\u03B6)",
  "eta (\u03B7)",
  "theta (\u03B8)",
  "eta prim (\u03B7')",
  "theta prim (\u03B8')",
  "chi (\u03C7)",
];
const defaultCheckedList = [
  "alpha (\u03B1)",
  "beta (\u03B2)",
  "gamma (\u03B3)",
  "delta (\u03B4)",
  "epsilon (\u03B5)",
  "zeta (\u03B6)",
  "eta (\u03B7)",
  "theta (\u03B8)",
  "eta prim (\u03B7')",
  "theta prim (\u03B8')",
  "chi (\u03C7)",
];

const RequestProperties = () => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <>
      <div style={{ padding: "40px", display: "flex", alignItems: "center" }}>
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
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default RequestProperties;
