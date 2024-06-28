"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle } from "../../types/modelsType";
import styles from "./page.module.css";
import { processingResponce } from "../../utils/processingResponse";
import { Button, Steps, Alert } from "antd";
import LoadingCard from "../../components/LoadingCard";
import { ReloadOutlined } from "@ant-design/icons";
import DataResult from "../../components/first-scenario/DataResult";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

let emptyResult: single_result_angle = {
  torsionAngles: [],
  containDiscontinuousSequences: false,
  resultRemovedAfter: "",
  structureMolecule: "",
  structureName: "",
};

const ResultPage = (props: any) => {
  const searchParams = useSearchParams();

  const [resultFile, setResultFile] =
    useState<single_result_angle>(emptyResult);
  const [status, setStatus] = useState("");
  const [stepsNumber, setStepsNumber] = useState(2);
  const [seedState, setSeedState] = useState(1);
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const steps = [
    { title: "Task uploaded" },
    { title: "Queueing" },
    { title: "Processing" },
    {
      title: "Success",
      description: `${
        stepsNumber === 4
          ? "Results will be stored until " + resultFile.resultRemovedAfter
          : ""
      }`,
    },
  ];

  useEffect(() => {
    processingResponce(
      searchParams.get("id")!,
      resultFile,
      setResultFile,
      setStatus,
      status
    );
  }, []);

  useEffect(() => {
    if (status === "PROCESSING") {
      setStepsNumber(3);
    }
    if (status === "SUCCESS") {
      setStepsNumber(4);
    }
  }, [status]);

  const resetSettings = () => {
    let x = seedState + 1;
    setSeedState(x);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.scenario}>
        <h1 className={styles.textwrap}>Task ID: {searchParams.get("id")!}</h1>
        <div className={styles.steps}>
          <Steps
            direction={isDesktop ? "horizontal" : "vertical"}
            current={stepsNumber}
            items={steps}
            status="wait"
          />
          {status === "FAILED" ? (
            <Alert
              message="Server error"
              showIcon
              // description={resultSet.error_message}
              type="error"
              style={{ margin: "20px" }}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.resetSettings}>
          <Button
            disabled={stepsNumber < 4}
            icon={<ReloadOutlined />}
            onClick={() => resetSettings()}
          >
            Reset settings
          </Button>
        </div>
      </div>
      {resultFile.structureName === "" ? (
        <LoadingCard />
      ) : (
        <DataResult resultFile={resultFile} key={seedState} />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <ResultPage />
    </Suspense>
  );
};

export default Page;
