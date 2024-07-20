"use client";
import { third_scenario_result } from "@/types/modelsType";
import { Button, message, Image, Divider } from "antd";
import config from "../../config.json";
import { DownloadOutlined } from "@ant-design/icons";
import { Suspense, useEffect, useState } from "react";
import ModelsMatrix from "./ModelsMatrix";
import ScatterPlotClustering from "./ScatterPlotClustering";
import ResultModelsTarget from "../second-scenario/output/ResultModelsTarget";
import { downloadFile } from "@/utils/downloadFile";

const ResultModelModel = (props: {
  result: third_scenario_result;
  taskId: string | null;
}) => {
  const [dataset, setDataset] = useState([]);
  const [modelSelection, setModelSelection] = useState<number>(0);

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
      temp[target.targetFileName] = null;
      tempMatrix.push(temp);
    });
    setDataset(tempMatrix);
    console.log(tempMatrix);
  }, [props.result]);
  return (
    <>
      {dataset.length != 0 ? (
        <>
          <ModelsMatrix
            models={props.result.structureModels}
            dataset={dataset}
            setModelSelection={setModelSelection}
          />

          <>
            <h2 style={{ marginTop: 0 }}>Dendrogram</h2>
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
            <Button
              type="text"
              size="large"
              style={{ marginTop: "15px" }}
              icon={<DownloadOutlined />}
              onClick={() => {
                downloadFile(
                  "dendrogram.svg",
                  `/many-many/${props.taskId}/dendrogram`
                );
              }}
            />
            <Divider />
          </>
          <Suspense fallback={<div>Loading...</div>}>
            <ScatterPlotClustering
              taskId={props.taskId}
              models={props.result.structureModels}
            />
          </Suspense>
          <h1>Target vs Models</h1>
          <ResultModelsTarget
            result={{
              ...props.result.oneManyResults[modelSelection],
              resultRemovedAfter: props.result.resultRemovedAfter,
              model: props.result.model,
              chain: props.result.chain,
              requestedAngles: props.result.requestedAngles,
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default ResultModelModel;
