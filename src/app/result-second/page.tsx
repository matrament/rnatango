"use client";
import styles from "./page.module.css";
import { second_scenario_result } from "@/types/modelsType";
import { useEffect, useState } from "react";
import { Divider, Tooltip, message } from "antd";
import { useSearchParams } from "next/navigation";
import { processingResponseSecond } from "@/utils/secondScenario/processingResponseSecond";
import ResultModelsTarget from "@/components/second-scenario/output/ResultModelsTarget";
import LoadingCard from "@/components/LoadingCard";

const initResult = {
  model: "",
  chain: "",
  lcsThreshold: 10,
  requestedAngles: [],
  differences: [],
};

const resultSecondScenario = () => {
  const searchParams = useSearchParams();
  const taskID = searchParams.get("id");
  const [result, setResult] = useState<second_scenario_result>(initResult);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    processingResponseSecond(taskID, setResult, setLoading);
  }, []);

  return (
    <>
      <div className={styles.scenario}>
        <h1>
          Task id:{" "}
          <span
            onClick={() => {
              window.navigator["clipboard"].writeText(taskID!);
              message.success("Request task id has been saved to clipboard.");
            }}
          >
            <Tooltip title="Click here to copy to clipboard.">{taskID}</Tooltip>
          </span>
        </h1>
        {result?.differences?.length === 0 ? (
          <LoadingCard />
        ) : (
          <ResultModelsTarget result={result} />
        )}
      </div>
    </>
  );
};
export default resultSecondScenario;
