"use client";
import styles from "./page.module.css";
import { third_scenario_result } from "@/types/modelsType";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StatusTask from "@/components/common/StatusTask";
import ResultModelModel from "@/components/third-scenario/ResultModelModel";
import { processingResponse } from "@/utils/processingResponse";
import { Progress } from "antd";
import type { ProgressProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const initModel = {
  resultRemovedAfter: "",
  model: "",
  chain: "",
  requestedAngles: [],
  structureModels: [],
  oneManyResults: [],
};

const ResultThirdScenario = () => {
  const searchParams = useSearchParams();
  const taskID = searchParams.get("id");
  const [result, setResult] = useState<third_scenario_result>(initModel);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [stepsNumber, setStepsNumber] = useState(1);
  const [seedState, setSeedState] = useState(1);
  const [progress, setProgress] = useState<number>(0);

  const twoColors: ProgressProps["strokeColor"] = {
    "0%": "#fb5f4c",
    "100%": "#00c6b9",
  };

  useEffect(() => {
    processingResponse(
      taskID,
      setResult,
      setStatus,
      setError,
      "many-many",
      setProgress
    );
  }, []);

  useEffect(() => {
    if (status === "WAITING") {
      setStepsNumber(2);
    }
    if (status === "PROCESSING") {
      setStepsNumber(3);
    }
    if (status === "SUCCESS") {
      setStepsNumber(4);
    }
    if (status === "FAILED") {
      setStepsNumber(0);
    }
  }, [status]);

  return (
    <>
      <StatusTask
        taskId={searchParams.get("id")!}
        setSeedState={setSeedState}
        stepsNumber={stepsNumber}
        error={error}
        removeDate={
          result?.resultRemovedAfter ? result.resultRemovedAfter : "..."
        }
        scenario={"Model vs Model"}
      />
      {result && result.oneManyResults ? (
        result.oneManyResults.length === 0 ? (
          stepsNumber === 3 ? (
            <Progress
              style={{ width: "auto", marginTop: "25px" }}
              percent={Math.round(progress * 10000) / 100}
              strokeColor={twoColors}
              size={[300, 20]}
            />
          ) : (
            <LoadingOutlined />
          )
        ) : (
          <div className={styles.scenario}>
            <ResultModelModel result={result} taskId={taskID} key={seedState} />
          </div>
        )
      ) : null}
    </>
  );
};

const PageThirdResult = () => {
  return (
    <Suspense>
      <ResultThirdScenario />
    </Suspense>
  );
};

export default PageThirdResult;
