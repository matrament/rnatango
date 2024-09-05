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
  scenario: "2" | "3";
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.scenario == "2" ? (
        <Divider orientation="left">
          Intersection of Target and Model(s){" "}
        </Divider>
      ) : (
        <Divider orientation="left">Intersection Model(s) </Divider>
      )}

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
          continousfragments={[[], []]}
        />
      </div>
      {props.scenario == "2" ? (
        <ul style={{ marginLeft: "30px" }}>
          <li>
            {`Target range: ${props.rangeTarget[0]}-${props.rangeTarget[1]}  (${
              props.rangeTarget[1] - props.rangeTarget[0]
            } nts)`}
          </li>
          <li>
            {`Largest common fragment: ${props.rangeIntersection[0]}-
          ${props.rangeIntersection[1]}  (${
              props.rangeIntersection[1] - props.rangeIntersection[0]
            } nts)`}
          </li>
        </ul>
      ) : (
        <ul style={{ marginLeft: "30px" }}>
          <li>
            {`Largest common fragment: ${
              props.rangeIntersection[1] - props.rangeIntersection[0]
            } nts`}
          </li>
        </ul>
      )}
    </div>
  );
};

export default IntersectionOfTargetModels;
