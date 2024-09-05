"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle } from "../../types/modelsType";
import styles from "./page.module.css";
import { processingResponse } from "../../utils/processingResponse";
import { Button, Steps, Alert } from "antd";
import LoadingCard from "../../components/common/LoadingCard";
import { ReloadOutlined } from "@ant-design/icons";
import DataResult from "../../components/first-scenario/DataResult";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import StatusTask from "@/components/common/StatusTask";

let emptyResult: single_result_angle = {
  torsionAngles: [],
  containDiscontinuousSequences: false,
  resultRemovedAfter: "",
  structureMolecule: "",
  structureName: "",
  structureTitle: "",
};

const ResultPage = (props: any) => {
  const searchParams = useSearchParams();

  const [resultFile, setResultFile] =
    useState<single_result_angle>(emptyResult);
  const [status, setStatus] = useState("");
  const [stepsNumber, setStepsNumber] = useState(1);
  const [error, setError] = useState<boolean>(false);
  const [seedState, setSeedState] = useState(1);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    processingResponse(
      searchParams.get("id")!,
      setResultFile,
      setStatus,
      setError,
      "single",
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
    <div style={{ width: "100%" }}>
      <StatusTask
        taskId={searchParams.get("id")!}
        setSeedState={setSeedState}
        stepsNumber={stepsNumber}
        error={error}
        removeDate={resultFile.resultRemovedAfter}
        scenario={"Single model"}
      />
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
