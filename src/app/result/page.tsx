"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { single_result_angle } from "../../types/modelsType";
import styles from "./page.module.css";
import { processingResponce } from "../../utils/processingResponse";
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
  const [stepsNumber, setStepsNumber] = useState(2);
  const [seedState, setSeedState] = useState(1);

  useEffect(() => {
    processingResponce(
      searchParams.get("id")!,
      resultFile,
      setResultFile,
      setStatus,
      status
    );
    console.log(resultFile);
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
    <div style={{ width: "100%" }}>
      <StatusTask
        taskId={searchParams.get("id")!}
        setSeedState={setSeedState}
        stepsNumber={stepsNumber}
        removeDate={resultFile.resultRemovedAfter}
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
