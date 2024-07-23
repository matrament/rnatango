"use client";

import { Suspense, useEffect, useState } from "react";
import UploadModels from "@/utils/secondScenario/UploadModels";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../first-scenario/first-scenario.module.css";
import {
  third_scenario_set_model,
  third_scenario_submit,
} from "@/types/modelsType";
import { UploadFile } from "antd/lib/upload/interface";
import {
  Button,
  Table,
  TableColumnsType,
  message,
  Tooltip,
  Select,
  Row,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ParametersScenarioSecond from "../second-scenario/ParametersScenarioSecond";
import { UploadedTaskDetails } from "@/utils/secondScenario/UploadedTaskDetails";
import initModel from "../../json/initModel.json";
import ExamplesTaskId from "../common/ExamplesTaskId";
import IntersectionOfTargetModels from "../second-scenario/IntersectionOfTargetModels";
import { getTaskId } from "@/utils/getTaskId";
import { deleteModel } from "@/utils/secondScenario/deleteModel";

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
  const [datasetModels, setDatasetModels] = useState<
    { chain: string; data: DataType[] }[]
  >([{ chain: "A", data: [{ key: 0, sequence: "", name: "", range: "" }] }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selection, setSelection] = useState<number>(0);
  const searchParams = useSearchParams();
  const taskID = searchParams.get("id");
  const [params, setParams] = useState<third_scenario_submit>({
    taskHashId: searchParams.get("id") ?? "",
    chain: "",
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
    let tempData: any = [];
    let tempOptions: string[] = [];
    if (modelsTarget && modelsTarget.models) {
      modelsTarget.sequences.map(
        (chain: { name: string; sequence: string }) => {
          tempOptions.push(chain.name);
          let temp: DataType[] = [];
          temp = modelsTarget.models.map((model, index) => {
            let currentChain = model.sourceSelection.chains.find(
              (obj) => obj.name === chain.name
            );
            let x = {
              key: model.fileId,
              name: model.fileName,
              sequence: currentChain?.sequence || "",
              range:
                `${currentChain?.nucleotideRange.fromInclusive}-${currentChain?.nucleotideRange.toInclusive}` ||
                "",
            };
            return x;
          });
          tempData.push({ chain: [chain.name], data: temp });
        }
      );
      if (modelsTarget.sequences.length === 0) {
        modelsTarget.models[0].sourceSelection.chains.map((chain) => {
          tempOptions.push(chain.name);
          tempData.push({
            chain: [chain.name],
            data: [
              {
                key: modelsTarget.models[0].fileId,
                name: modelsTarget.models[0].fileName,
                sequence: "",
                range: "",
              },
            ],
          });
        });
      }
      setDatasetModels(tempData);
      setOptions(tempOptions);
    }
    setUploadStructure(undefined);
  }, [modelsTarget, uploadStructure, taskID]);

  useEffect(() => {
    taskID
      ? UploadedTaskDetails(
          taskID,
          setModelsTarget,
          setError,
          "/many-many/form/"
        )
      : null;
  }, [taskID]);

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
            deleteModel(
              searchParams.get("id"),
              record.key,
              setModelsTarget,
              "many-many"
            )
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
    let result = {
      ...params,
      chain: options[selection],
      taskHashId: searchParams.get("id") ?? "",
    };
    getTaskId(result, router, setLoading, "many-many/submit", "result-third");
  };

  const handleChange = (value: string) => {
    setSelection(Number(value));
  };

  return (
    <div className={styles.scenario} style={{ width: "100%" }}>
      {taskID ? (
        <h1>
          Task id:{" "}
          <span
            onClick={() => {
              window.navigator["clipboard"].writeText(taskID!);
              message.success("Request task ID has been saved to clipboard.");
            }}
          >
            <Tooltip title="Click here to copy to clipboard.">{taskID}</Tooltip>
          </span>
        </h1>
      ) : (
        <Row justify={"center"}>
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
        </Row>
      )}
      <Row justify={"center"} style={{ marginBottom: "15px" }}>
        <UploadModels
          uploadStructure={uploadStructure}
          setUploadStructure={setUploadStructure}
          setModelsTarget={setModelsTarget}
          setLoading={setLoading}
          taskID={taskID}
          error={error}
          scenario={"3"}
          router={router}
        />
      </Row>
      <Suspense>
        {taskID && modelsTarget && modelsTarget?.models?.length != 0 ? (
          <>
            {datasetModels.length != 0 ? (
              <>
                <Row justify={"center"}>
                  <Select
                    style={{ width: "200px", marginBottom: "15px" }}
                    defaultValue={String(selection)}
                    options={options.map((e, index) => ({
                      value: String(index),
                      label: `chain ${e}`,
                    }))}
                    onChange={handleChange}
                  />
                </Row>

                <Table
                  style={{ margin: "0px 30px 10px 30px" }}
                  dataSource={datasetModels[selection].data}
                  columns={columns}
                  pagination={{ position: ["bottomCenter"] }}
                  scroll={{ x: true }}
                />
              </>
            ) : null}

            {modelsTarget?.sequences?.length != 0 ? (
              <>
                <IntersectionOfTargetModels
                  sequence={modelsTarget.sequences[0].sequence}
                  rangeTarget={[
                    0,
                    modelsTarget.sequences[0].sequence.length - 1,
                  ]}
                  rangeIntersection={[
                    0,
                    modelsTarget.sequences[0].sequence.length - 1,
                  ]}
                  scenario={"3"}
                />
                <ParametersScenarioSecond
                  params={params}
                  setParams={setParams}
                />
                <Row justify={"center"}>
                  <Button
                    style={{ marginBottom: "20px", width: "150px" }}
                    type="primary"
                    shape="round"
                    size="large"
                    loading={loading}
                    onClick={submit}
                    disabled={
                      params.angles.length === 0 ||
                      modelsTarget.models.length < 3
                    }
                  >
                    Submit
                  </Button>
                </Row>
              </>
            ) : null}
          </>
        ) : null}
      </Suspense>
    </div>
  );
};

export default ThirdScenarioUpload;
