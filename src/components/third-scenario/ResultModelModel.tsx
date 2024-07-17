"use client";
import { third_scenario_result } from "@/types/modelsType";
import { Button, message, Image, Divider } from "antd";
import config from "../../config.json";

import { useEffect, useState } from "react";
import ModelsMatrix from "./ModelsMatrix";
import ScatterPlotClustering from "./ScatterPlotClustering";

const ResultModelModel = (props: {
  result: third_scenario_result;
  taskId: string | null;
}) => {
  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    let tempMatrix: any = [];
    props.result.oneManyResults.map((target, index) => {
      let temp: { [key: string]: any } = {
        name: target.targetFileName,
        key: index,
      };

      target.differences.map((model) => {
        temp[model.modelName] = `${model.modelMCQ.toFixed(
          2
        )},${model.modelLCS.coveragePercent.toFixed(2)}`;
      });
      tempMatrix.push(temp);
    });
    setDataset(tempMatrix);
    console.log(tempMatrix);
  }, [props.result]);
  return (
    <>
      {dataset.length != 0 ? (
        <ModelsMatrix models={props.result.structureModels} dataset={dataset} />
      ) : null}
      <Image
        alt={"secondary_structure"}
        style={{
          width: "100%",
          objectFit: "contain",
          objectPosition: "50% 50%",
        }}
        width={700}
        // className="two-d-image"
        src={`${config.SERVER_URL}/many-many/${props.taskId}/dendrogram`}
      />
      <ScatterPlotClustering />
    </>
  );
};

export default ResultModelModel;
