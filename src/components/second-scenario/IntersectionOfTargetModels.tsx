"use client";

import FullChainAnalysis from "./FullChainAnalysis";
import { Divider } from "antd";

const cutTargetFragment = (sequence: string, range: number[]) => {
  let x: string = sequence.split("").slice(range[0], range[1]).join("");
};

const IntersectionOfTargetModels = (props: {
  sequence: string;
  rangeTarget: number[];
  rangeIntersection: number[];
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Divider orientation="left">Intersection of Target and Model(s) </Divider>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FullChainAnalysis
          sequence={props.sequence
            .split("")
            .slice(
              props.rangeTarget[0] - props.rangeTarget[0],
              props.rangeTarget[1] + 1 - props.rangeTarget[0]
            )
            .join("")}
          residuesWithoutAtoms={[]}
          range={props.rangeIntersection}
          index={props.rangeTarget[0]}
        />
      </div>
      <ul style={{ marginLeft: "30px" }}>
        <li>
          {" "}
          Target range: {props.rangeTarget[0]}-{props.rangeTarget[1]}
        </li>
        <li>
          Largest common fragment: {props.rangeIntersection[0]}-
          {props.rangeIntersection[1]}
        </li>
      </ul>
    </div>
  );
};

export default IntersectionOfTargetModels;
