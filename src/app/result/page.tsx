"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle } from "@/types/modelsType";
import styles from "./page.module.css";
import { processingResponce } from "@/utils/processingResponse";
import { Button, Steps } from "antd";
import LoadingCard from "@/components/LoadingCard";
import { ReloadOutlined } from "@ant-design/icons";
import DataResult from "../../components/first-scenario/DataResult";

let emptyResult: single_result_angle = {
  torsionAngles: [],
};

const ResultPage = () => {
  const searchParams = useSearchParams();
  // const params = useParams<{ taskid: string }>();
  const [getResultFile, setGetResultFile] =
    useState<single_result_angle>(emptyResult);
  const [getStatus, setGetStatus] = useState("");
  const [stepsNumber, setStepsNumber] = useState(2);
  const [seedState, setSeedState] = useState(1);

  const steps = [
    { title: "Task uploaded" },
    { title: "Queueing" },
    { title: "Processing" },
    {
      title: "Task completed",
      description: "success",
      // resultSet.status === 4
      //   ? "Results will be stored until " + resultSet.remove_date + "."
      //   : "",
    },
  ];

  useEffect(() => {
    processingResponce(searchParams.get("id")!, setGetResultFile, setGetStatus);
  }, []);

  useEffect(() => {
    if (getStatus === "PROCESSING") {
      setStepsNumber(3);
    }
    if (getStatus === "SUCCESS") {
      setStepsNumber(5);
    }
  }, [getStatus]);

  const resetSettings = () => {
    let x = seedState + 1;
    setSeedState(x);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <h1 className={styles.textwrap}>TaskId: {searchParams.get("id")!}</h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Steps current={stepsNumber} items={steps} status="wait" />
        </div>
        <div className={styles.resetSettings}>
          <Button icon={<ReloadOutlined />} onClick={() => resetSettings()}>
            Reset settings
          </Button>
        </div>
      </div>
      {stepsNumber < 4 ? (
        <LoadingCard />
      ) : (
        <DataResult getResultFile={getResultFile} key={seedState} />
      )}
    </div>
  );
};

export default ResultPage;
