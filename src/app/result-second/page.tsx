"use client";
import styles from "./page.module.css";
import { second_scenario_result } from "@/types/modelsType";
import { Suspense, useEffect, useState } from "react";
import { Divider, Tooltip, message } from "antd";
import { useSearchParams } from "next/navigation";
import { processingResponseSecond } from "@/utils/secondScenario/processingResponseSecond";
import ResultModelsTarget from "@/components/second-scenario/output/ResultModelsTarget";
import LoadingCard from "@/components/common/LoadingCard";
import StatusTask from "@/components/common/StatusTask";

const initResult = {
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
  const [stepsNumber, setStepsNumber] = useState(2);
  const [seedState, setSeedState] = useState(1);

  useEffect(() => {
    processingResponseSecond(taskID, setResult, setStatus, status);
  }, []);

  useEffect(() => {
    if (status === "PROCESSING") {
      setStepsNumber(3);
    }
    if (status === "SUCCESS") {
      setStepsNumber(4);
    }
  }, [status]);

  return (
    <>
      <StatusTask
        taskId={searchParams.get("id")!}
        setSeedState={setSeedState}
        stepsNumber={stepsNumber}
        removeDate={"..."}
      />
      {result && result.differences ? (
        result.differences.length === 0 ? (
          <LoadingCard />
        ) : (
          <div className={styles.scenario}>
            <ResultModelsTarget result={result} key={seedState} />
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
