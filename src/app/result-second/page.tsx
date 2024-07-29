"use client";
import styles from "./page.module.css";
import { second_scenario_result } from "@/types/modelsType";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResultModelsTarget from "@/components/second-scenario/output/ResultModelsTarget";
import LoadingCard from "@/components/common/LoadingCard";
import StatusTask from "@/components/common/StatusTask";
import { processingResponse } from "@/utils/processingResponse";

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

  useEffect(() => {
    processingResponse(taskID, setResult, setStatus, setError, "one-many");
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
      {result && result.differences ? (
        result.differences.length === 0 ? (
          !error ? (
            <LoadingCard />
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
