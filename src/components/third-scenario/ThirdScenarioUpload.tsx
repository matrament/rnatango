"use client";

import { useEffect, useState } from "react";
import UploadModels from "@/utils/secondScenario/UploadModels";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../first-scenario/first-scenario.module.css";
import {
  third_scenario_set_model,
  second_scenario_submit,
} from "@/types/modelsType";
import { UploadFile } from "antd/lib/upload/interface";
import {
  Button,
  Table,
  TableColumnsType,
  message,
  Tooltip,
  Divider,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ParametersScenarioSecond from "../second-scenario/ParametersScenarioSecond";
import { UploadedTaskDetails } from "@/utils/secondScenario/UploadedTaskDetails";
import initModel from "../../json/initModel.json";
import ExamplesTaskId from "../common/ExamplesTaskId";

interface DataType {
  key: React.Key;
  sequence: string;
  name: string;
  range: string;
}

const ThirdScenarioUpload = () => {
  const router = useRouter();

  const [modelsTarget, setModelsTarget] =
    useState<third_scenario_set_model>(initModel);
  const [datasetModels, setDatasetModels] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const taskID = searchParams.get("id");
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

  useEffect(() => {
    let temp: DataType[] = [];
    if (modelsTarget.taskHashId != "") {
      temp = modelsTarget.models.map((model, index) => {
        let x = {
          key: model.fileId,
          name: model.fileName,
          sequence: model.sequence,
          range: `${model.sourceSelection.chains[0].nucleotideRange.fromInclusive}-${model.sourceSelection.chains[0].nucleotideRange.toInclusive}`,
        };
        return x;
      });
      router.push(`?scenario=3&id=${modelsTarget.taskHashId}`);
    }
    setDatasetModels(temp);
    setUploadStructure(undefined);
  }, [modelsTarget, uploadStructure]);

  useEffect(() => {
    taskID ? UploadedTaskDetails(taskID, setModelsTarget, setError, "3") : null;
  }, []);

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
            console.log(searchParams.get("id"), record.key, setModelsTarget)
          }
        >
          delete
        </Button>
      ),
      width: 200,
      fixed: "right",
    },
  ];

  const submit = () => {
    setLoading(true);
  };

  return (
    <div className={styles.scenario}>
      {taskID ? (
        <>
          <h1>
            Task id:{" "}
            <span
              onClick={() => {
                window.navigator["clipboard"].writeText(taskID!);
                message.success("Request task id has been saved to clipboard.");
              }}
            >
              <Tooltip title="Click here to copy to clipboard.">
                {taskID}
              </Tooltip>
            </span>
          </h1>
        </>
      ) : (
        // <p>Upload first model or get result from example:</p>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <p style={{ margin: 0 }}>From example collection:</p>

          <ExamplesTaskId
            scenario={"many-many"}
            router={router}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      )}

      <UploadModels
        uploadStructure={uploadStructure}
        setUploadStructure={setUploadStructure}
        setModelsTarget={setModelsTarget}
        setLoading={setLoading}
        taskID={taskID}
        error={error}
        scenario={"3"}
      />
      {taskID ? (
        // modelsTarget?.models?.length != 0 ? (
        <>
          {/* <IntersectionOfTargetModels
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
              /> */}
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
      ) : // ) : null
      null}
    </div>
  );
};

export default ThirdScenarioUpload;
