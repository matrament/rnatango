"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle } from "@/types/modelsType";
import styles from "./page.module.css";
import { processingResponce } from "@/utils/processingResponse";
import { Steps } from "antd";
import LoadingCard from "@/components/LoadingCard";

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

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <h1>TaskId: {params.taskid}</h1>
        <div style={{ width: "80%" }}>
          <Steps current={stepsNumber} items={steps} status="wait" />
        </div>
      </div>
      {stepsNumber < 4 ? (
        <LoadingCard />
      ) : (
        <Result getResultFile={getResultFile} />
      )}
    </div>
  );
};

export default ResultPage;
