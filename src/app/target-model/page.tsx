"use client";
import UploadModels from "@/utils/secondScenario/UploadModels";
import styles from "./page.module.css";
import IntersectionOfTargetModels from "@/components/second-scenario/IntersectionOfTargetModels";
import ParametersScenarioSecond from "@/components/second-scenario/ParametersScenarioSecond";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { UploadFile } from "antd/lib/upload/interface";
import {
  Button,
  Table,
  TableColumnsType,
  message,
  Tooltip,
  Divider,
} from "antd";
import {
  second_scenario_models_target,
  second_scenario_submit,
} from "@/types/modelsType";
import { UploadedTaskDetails } from "@/utils/secondScenario/UploadedTaskDetails";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteModel } from "@/utils/secondScenario/DeleteModel";
import initTarget from "../../json/initTarget.json";
import { getTaskID } from "../../utils/secondScenario/getTaskID";

interface DataType {
  key: React.Key;
  sequence: string;
  name: string;
  range: string;
}

const TargetModels = () => {
  const router = useRouter();

  const [modelsTarget, setModelsTarget] =
    useState<second_scenario_models_target>(initTarget);
  const [datasetModels, setDatasetModels] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const targetID = searchParams.get("id");
  const [params, setParams] = useState<second_scenario_submit>({
    taskHashId: searchParams.get("id") ?? "",
    angles: [
      "ALPHA",
      "BETA",
      "GAMMA",
      "DELTA",
      "EPSILON",
      "ZETA",
      "ETA",
      "ETA_PRIM",
      "THETA",
      "THETA_PRIM",
      "CHI",
    ],
    threshold: 15,
  });

  const [uploadStructure, setUploadStructure] = useState<
    UploadFile[] | undefined
  >(undefined);

  const columns: TableColumnsType<DataType> = [
    {
      title: "File name",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "Longest common substring",
      dataIndex: "range",
      key: "range",
      width: 250,
      fixed: "left",
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      title: "Delete model",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() =>
            DeleteModel(searchParams.get("id"), record.key, setModelsTarget)
          }
        >
          delete
        </Button>
      ),
      width: 200,
      fixed: "right",
    },
  ];

  useEffect(() => {
    let temp: DataType[] = [];
    if (modelsTarget.models.length != 0) {
      temp = modelsTarget.models.map((model, index) => {
        let x = {
          key: model.fileId,
          name: model.fileName,
          sequence: model.sequence,
          range: `${model.selection.chains[0].nucleotideRange.fromInclusive}-${model.selection.chains[0].nucleotideRange.toInclusive}`,
        };
        return x;
      });
    }
    setDatasetModels(temp);
    setUploadStructure(undefined);
  }, [modelsTarget, uploadStructure]);

  useEffect(() => {
    UploadedTaskDetails(targetID, setModelsTarget, setError);
  }, []);

  const submit = () => {
    setLoading(true);
    getTaskID(params, router, setLoading);
  };

  return (
    <>
      <div className={styles.scenario}>
        <h1>
          Task id:{" "}
          <span
            onClick={() => {
              window.navigator["clipboard"].writeText(targetID!);
              message.success("Request task id has been saved to clipboard.");
            }}
          >
            <Tooltip title="Click here to copy to clipboard.">
              {targetID}
            </Tooltip>
          </span>
        </h1>

        <UploadModels
          uploadStructure={uploadStructure}
          setUploadStructure={setUploadStructure}
          setModelsTarget={setModelsTarget}
          setLoading={setLoading}
          taskID={searchParams.get("id")}
          error={error}
        />
        {datasetModels.length != 0 ? (
          <Table
            style={{ margin: "0px 30px 10px 30px" }}
            dataSource={datasetModels}
            columns={columns}
            pagination={{ position: ["bottomCenter"] }}
            scroll={{ x: true }}
          />
        ) : null}
        {modelsTarget != undefined ? (
          modelsTarget.models.length != 0 ? (
            <>
              <IntersectionOfTargetModels
                sequence={modelsTarget.target.sequence}
                rangeTarget={[
                  modelsTarget.target.sourceSelection.chains[0].nucleotideRange
                    .fromInclusive,
                  modelsTarget.target.sourceSelection.chains[0].nucleotideRange
                    .toInclusive,
                ]}
                rangeIntersection={[
                  modelsTarget.target.selection.chains[0].nucleotideRange
                    .fromInclusive,
                  modelsTarget.target.selection.chains[0].nucleotideRange
                    .toInclusive,
                ]}
              />
              <ParametersScenarioSecond params={params} setParams={setParams} />
              <Button
                style={{ marginBottom: "20px" }}
                type="primary"
                shape="round"
                size="large"
                loading={loading}
                onClick={submit}
                disabled={params.angles.length === 0}
              >
                Submit
              </Button>
            </>
          ) : null
        ) : null}
      </div>
    </>
  );
};

const PageTargetModels = () => {
  return (
    <Suspense>
      <TargetModels />
    </Suspense>
  );
};

export default PageTargetModels;
