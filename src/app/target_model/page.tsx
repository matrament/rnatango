"use client";
import UploadModels from "@/components/second-scenario/UploadModels";
import styles from "./page.module.css";
import IntersectionOfTargetModels from "@/components/second-scenario/IntersectionOfTargetModels";
import ParametersScenarioSecond from "@/components/second-scenario/ParametersScenarioSecond";
import { useEffect, useState } from "react";
import { UploadFile } from "antd/lib/upload/interface";
import { Button } from "antd";
import Link from "next/link";

const targetModels = () => {
  const [structure, setStructure] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [isUpload, setIsUpload] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [uploadStructure, setUploadStructure] = useState<
    UploadFile[] | undefined
  >(undefined);

  const sequence = "abcdecsssssssssaaaaaaaccccc";
  const rangeTarget = [2, 8];
  const range = [3, 6];

  useEffect(() => {
    console.log(uploadStructure);
  }, [uploadStructure]);

  return (
    <>
      <div className={styles.scenario}>
        <p>Upload max 5 models for analyse:</p>
        <UploadModels
          uploadStructure={uploadStructure}
          setShowResult={setShowResult}
          setUploadStructure={setUploadStructure}
          setStructure={setStructure}
          setIsUpload={setIsUpload}
          setLoading={setLoading}
        />
      </div>
      <IntersectionOfTargetModels
        sequence={sequence}
        rangeTarget={rangeTarget}
        rangeIntersection={range}
      />
      <ParametersScenarioSecond />
      <Link href="/result_second">
        <Button>Submit</Button>
      </Link>
    </>
  );
};

export default targetModels;
