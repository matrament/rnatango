"use client";
import styles from "./page.module.css";
import { third_scenario_result } from "@/types/modelsType";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingCard from "@/components/common/LoadingCard";
import StatusTask from "@/components/common/StatusTask";
import ResultModelModel from "@/components/third-scenario/ResultModelModel";
import { processingResponse } from "@/utils/processingResponse";

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

  useEffect(() => {
    processingResponse(taskID, setResult, setStatus, setError, "many-many");
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
      />
      {result && result.oneManyResults ? (
        result.oneManyResults.length === 0 ? (
          <LoadingCard />
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
