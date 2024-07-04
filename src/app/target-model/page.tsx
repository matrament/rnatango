"use client";
import UploadModels from "@/utils/secondScenario/UploadModels";
import styles from "./page.module.css";
import IntersectionOfTargetModels from "@/components/second-scenario/IntersectionOfTargetModels";
import ParametersScenarioSecond from "@/components/second-scenario/ParametersScenarioSecond";
import { useEffect, useState } from "react";
import { UploadFile } from "antd/lib/upload/interface";
import {
  Button,
  Table,
  TableColumnsType,
  message,
  Tooltip,
  Divider,
} from "antd";
import { useSearchParams } from "next/navigation";
import {
  second_scenario_models_target,
  second_scenario_submit,
} from "@/types/modelsType";
import { UploadedTaskDetails } from "@/utils/secondScenario/UploadedTaskDetails";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteModel } from "@/utils/secondScenario/DeleteModel";

const initSelectionChain = {
  name: "",
  nucleotideRange: {
    fromInclusive: 0,
    toInclusive: 0,
  },
};

interface DataType {
  key: React.Key;
  sequence: string;
  number: string;
  range: string;
}

const initTarget = {
  target: {
    sequence: "",
    sourceSelection: {
      modelName: "",
      chains: [initSelectionChain],
    },
    selection: {
      modelName: "",
      chains: [initSelectionChain],
    },
  },
  models: [],
};

const targetModels = () => {
  const [modelsTarget, setModelsTarget] =
    useState<second_scenario_models_target>(initTarget);
  const [datasetModels, setDatasetModels] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState<second_scenario_submit>({
    taskHashId: "",
    angles: [
      "alpha",
      "beta",
      "gamma",
      "delta",
      "epsilon",
      "zeta",
      "eta",
      "theta",
      "eta prim",
      "theta_prim",
      "chi",
    ],
    threshold: 15,
  });

  const [uploadStructure, setUploadStructure] = useState<
    UploadFile[] | undefined
  >(undefined);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
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

  const searchParams = useSearchParams();
  const targetID = searchParams.get("id");

  useEffect(() => {
    let temp: DataType[] = [];
    if (modelsTarget.models.length != 0) {
      temp = modelsTarget.models.map((model, index) => {
        let x = {
          key: model.fileId,
          number: (index + 1).toString(),
          sequence: model.sequence,
          range: `${model.selection.chains[0].nucleotideRange.fromInclusive}-${model.selection.chains[0].nucleotideRange.toInclusive}`,
        };
        return x;
      });
    }
    setDatasetModels(temp);
  }, [modelsTarget]);

  useEffect(() => {
    UploadedTaskDetails(targetID, setModelsTarget);
  }, []);

  const submit = () => {
    setParams({ ...params, taskHashId: targetID ?? "" });
    console.log(params);
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
        <Divider />

        <UploadModels
          uploadStructure={uploadStructure}
          setUploadStructure={setUploadStructure}
          setModelsTarget={setModelsTarget}
          setLoading={setLoading}
          taskID={searchParams.get("id")}
        />
        {datasetModels.length != 0 ? (
          <Table
            style={{ margin: "50px 30px 20px 30px" }}
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
                style={{ marginBottom: "30px", marginTop: "15px" }}
                type="primary"
                shape="round"
                size="large"
                onClick={submit}
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

export default targetModels;
