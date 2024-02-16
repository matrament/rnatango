"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle } from "@/types/modelsType";
import styles from "./page.module.css";
import { processingResponce } from "@/utils/processingResponse";
import { Button, Steps } from "antd";
import LoadingCard from "@/components/LoadingCard";
import { ReloadOutlined } from "@ant-design/icons";
import Result from "../../../components/first-scenario/Result";

let emptyResult: single_result_angle = {
  torsionAngles: [],
};

const ResultPage = () => {
  const params = useParams<{ taskid: string }>();
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
    processingResponce(params.taskid, setGetResultFile, setGetStatus);

    console.log(getStatus);
    if (getStatus === "PROCESSING") {
      setStepsNumber(3);
    }
    if (getStatus === "SUCCESS") {
      setStepsNumber(5);
    }
  }, [params.taskid, getStatus]);

  const resetSettings = () => {
    let x = seedState + 1;
    setSeedState(x);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <h1 className={styles.textwrap}>TaskId: {params.taskid}</h1>
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
        <Result getResultFile={getResultFile} key={seedState} />
      )}
    </div>
  );
};

export default ResultPage;
