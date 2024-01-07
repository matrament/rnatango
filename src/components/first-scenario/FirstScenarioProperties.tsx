"use client";
import { useState, useEffect } from "react";
import { Select, Button } from "antd";
import styles from "./first-scenario.module.css";
import SequenceCard from "./SequenceCard";
import {
  Models,
  SingleModel,
  Chains,
  structure,
  single_scenario_request,
  single_scenario_request_selection_chain,
} from "../../types/modelsType";
import { getTaskId } from "@/utils/getTaskId";
import Link from "next/link";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const FirstScenarioProperties = (props: { getStructure: structure }) => {
  const [loading, setLoading] = useState(false);
  const [resultModel, setResultModel] = useState<single_scenario_request>({
    fileId: "",
    selections: [],
  });
  const [allModels, setAllModels] = useState<string[]>([]);
  const [allChains, setAllChains] = useState<{ [key: string]: string[] }>({});
  const [modelArray, setModelArray] = useState<Models>({});
  const [selectedChains, setSelectedChains] = useState<{
    [key: string]: string[];
  }>({});

  const submit = () => {
    // if (
    //   (!uploadStructure || uploadStructure.length == 0) &&
    //   pdbId.name.length < 4
    // ) {
    //   message.error(lang.lack_of_source);
    //   return null;
    // }
    // setLoading(true);

    // console.log(modelArray[Object.keys(selectedChains)[0]]["0"]);
    console.log(resultModel);
    getTaskId(resultModel);
  };

  useEffect(() => {
    setAllModels([]);
    let x: Models = {};
    for (let i = 0; i < props.getStructure.models.length; i++) {
      x[i + 1] = {};
      for (let j = 0; j < props.getStructure.models[i].chains.length; j++) {
        x[i + 1][props.getStructure.models[i].chains[j].name] =
          props.getStructure.models[i].chains[j];
      }
    }
    setModelArray(x);
    setAllModels(Object.keys(x));
    setAllChains({ ["1"]: Object.keys(x["1"]) });
  }, [props.getStructure.models]);

  useEffect(() => {
    setResultModel({
      ...resultModel,
      fileId: props.getStructure.fileHashId,
      selections: [{ ...resultModel.selections, modelName: "1", chains: [] }],
    });
  }, []);

  const chooseModels = (value: string) => {
    setAllChains({ [value]: Object.keys(modelArray[value]) });
    setResultModel({
      ...resultModel,
      selections: [{ ...resultModel.selections, modelName: value, chains: [] }],
    });
  };

  const handleChooseChain = (value: string[]) => {
    setSelectedChains({ [Object.keys(allChains)[0]]: value });
    let x: single_scenario_request_selection_chain[] = value.map((e) => ({
      name: e,
      nucleotideRange: {
        fromInclusive: 0,
        toInclusive: 0,
      },
    }));
    setResultModel({
      ...resultModel,
      selections: [
        {
          modelName:
            resultModel.selections.length > 0
              ? resultModel.selections[0].modelName
              : "1",
          chains: x,
        },
      ],
    });
  };

  return (
    <div className={styles.scenario}>
      <div className={styles.header}>
        <h2>{props.getStructure.fileHashId.toUpperCase()}</h2>
        <p style={{ margin: "0" }}>fileHashId</p>
      </div>
      <div className={styles.select}>
        <p>Choose model for analyse:</p>
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue={"1"}
          optionFilterProp="children"
          onChange={chooseModels}
          onSearch={onSearch}
          filterOption={filterOption}
          options={allModels?.map((num) => {
            return { value: num, label: num };
          })}
        />
        <p>Choose the chain(s):</p>
        <Select
          mode="multiple"
          allowClear
          style={{ width: 200 }}
          placeholder="Please select"
          onChange={handleChooseChain}
          options={Object.values(allChains)[0]?.map((el) => {
            return { value: el, label: el };
          })}
        />
      </div>
      {Object.values(selectedChains)[0]?.length != 0 ? (
        <>
          {Object.values(selectedChains)[0]?.map((el) => (
            <SequenceCard
              key={el}
              name={el}
              indexChain={Object.values(selectedChains)[0].indexOf(el)}
              sequence={
                modelArray[Object.keys(selectedChains)[0]][el]["sequence"]
              }
              residuesWithoutAtoms={
                modelArray[Object.keys(selectedChains)[0]][el][
                  "residuesWithoutAtoms"
                ]
              }
              setResultModel={setResultModel}
              resultModel={resultModel}
            />
          ))}
          <Link href="/result">
            <Button
              size="large"
              type="primary"
              shape="round"
              onClick={submit}
              disabled={Object.keys(selectedChains).length == 0}
            >
              Submit a task
            </Button>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default FirstScenarioProperties;
