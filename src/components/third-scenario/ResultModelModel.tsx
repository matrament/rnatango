"use client";
import { third_scenario_result } from "@/types/modelsType";
import { Button, Image, Divider, Col, Row } from "antd";
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
  }, [props.result]);
  return (
    <div style={{ width: "100%" }}>
      {dataset.length != 0 ? (
        <>
          <ModelsMatrix
            models={props.result.structureModels}
            dataset={dataset}
            setModelSelection={setModelSelection}
          />

          <>
            <h2 style={{ marginTop: 0 }}>Dendrogram (based on global MCQ)</h2>
            <Row>
              <Col
                flex="auto"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    marginLeft: "75px",
                    width: "70%",
                    maxWidth: "600px",
                  }}
                >
                  <Image
                    alt={"dendrogram"}
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      objectPosition: "50% 50%",
                    }}
                    width={"100%"}
                    // className="two-d-image"
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/many-many/${props.taskId}/dendrogram`}
                  />
                </div>
              </Col>
              <Col flex="75px">
                <Button
                  type="primary"
                  // size="large"
                  style={{ marginTop: "15px", width: "32px" }}
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    downloadFile(
                      "dendrogram.svg",
                      `/many-many/${props.taskId}/dendrogram`
                    );
                  }}
                />
              </Col>
            </Row>
            <Divider />
          </>
          <Suspense fallback={<div>Loading...</div>}>
            <ScatterPlotClustering
              taskId={props.taskId}
              models={props.result.structureModels}
            />
          </Suspense>
          <h1>{`Models vs Target (${props.result.oneManyResults[modelSelection].targetFileName})`}</h1>
          <div style={{ width: "100%", textAlign: "center" }}>
            <b
              style={{
                margin: "0",
                color: "#fb5f4c",
                width: "100%",
              }}
            >
              The following sections show the details corresponding to the
              Model(s) vs Target scenario for the selected row of the Model vs
              Model table
            </b>
          </div>
          <ResultModelsTarget
            result={{
              ...props.result.oneManyResults[modelSelection],
              resultRemovedAfter: props.result.resultRemovedAfter,
              model: props.result.model,
              chain: props.result.chain,
              requestedAngles: props.result.requestedAngles,
            }}
            scenario={"many-many"}
          />
        </>
      ) : null}
    </div>
  );
};

export default ResultModelModel;
