"use client";
import styles from "./page.module.css";
import { second_scenario_result } from "@/types/modelsType";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResultModelsTarget from "@/components/second-scenario/output/ResultModelsTarget";
import StatusTask from "@/components/common/StatusTask";
import { processingResponse } from "@/utils/processingResponse";
import { Progress } from "antd";
import type { ProgressProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const initResult = {
  resultRemovedAfter: "",
  model: "",
  targetHashId: "",
  targetFileName: "",
  chain: "",
  lcsThreshold: 10,
  requestedAngles: [],
  differences: [],
};

const ResultSecondScenario = () => {
  const searchParams = useSearchParams();
  const taskID = searchParams.get("id");
  const [result, setResult] = useState<second_scenario_result>(initResult);
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
      "one-many",
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
        scenario={"Model(s) vs Target"}
      />
      {result && result.differences ? (
        result.differences.length === 0 ? (
          !error ? (
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
            <h3>
              No results exist in the system for task
              <br />
              {searchParams.get("id")!}
            </h3>
          )
        ) : (
          <div className={styles.scenario}>
            <ResultModelsTarget
              result={result}
              scenario={"one-many"}
              key={seedState}
            />
          </div>
        )
      ) : null}
    </>
  );
};

const PageSecondResult = () => {
  return (
    <Suspense>
      <ResultSecondScenario />
    </Suspense>
  );
};

export default PageSecondResult;
