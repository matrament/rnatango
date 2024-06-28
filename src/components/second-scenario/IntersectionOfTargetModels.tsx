"use client";

import FullChainAnalysis from "./FullChainAnalysis";

const cutTargetFragment = (sequence: string, range: number[]) => {
  let x: string = sequence.split("").slice(range[0], range[1]).join("");
};

const IntersectionOfTargetModels = (props: {
  sequence: string;
  rangeTarget: number[];
  rangeIntersection: number[];
}) => {
  return (
    <div>
      <p>Intersection of Target and Model(s)</p>
      <FullChainAnalysis
        sequence={props.sequence
          .split("")
          .slice(props.rangeTarget[0], props.rangeTarget[1] + 1)
          .join("")}
        residuesWithoutAtoms={[]}
        range={props.rangeIntersection}
        index={props.rangeTarget[0]}
      />
      <p>
        Target range: {props.rangeTarget[0]}-{props.rangeTarget[1]}
      </p>
      <p>
        Largest common fragment: {props.rangeIntersection[0]}-
        {props.rangeIntersection[1]}
      </p>
    </div>
  );
};

export default IntersectionOfTargetModels;
