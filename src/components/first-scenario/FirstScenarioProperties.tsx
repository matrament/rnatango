/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./first-scenario.module.css";
import { Select, Button } from "antd";
import {
  Models,
  structure,
  single_scenario_request,
  single_scenario_request_selection_chain,
} from "../../types/modelsType";
import { GetTaskId } from "../../utils/getTaskId";
import SequenceCard from "./SequenceCard";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

type resultType = {
  [key: string]: number[][];
};

type multipleChain = {
  [key: string]: {};
};

const FirstScenarioProperties = (props: {
  getStructure: structure;
  fileName: string;
}) => {
  const [resultModel, setResultModel] = useState<resultType>({});
  const [selectedModel, setSelectedModel] = useState<string>("1");
  const [selectedChains, setSelectedChains] = useState<string[] | []>([]);
  const [startingModels, setStartingModels] = useState<any>([]);
  const [optionsChains, setOptionsChains] = useState<string[]>([]);
  const router = useRouter();

  const submit = () => {
    let y: any = [];
    selectedChains.forEach((chain) =>
      y.push(
        resultModel[chain].map((num) => {
          return {
            ["name"]: chain,
            ["nucleotideRange"]: {
              ["fromInclusive"]: num[0],
              ["toInclusive"]: num[1],
            },
          };
        })
      )
    );
    y = y.flat();
    let result = {
      fileId: props.getStructure.fileHashId,
      selections: [
        {
          modelName: selectedModel,
          chains: y,
        },
      ],
    };
    GetTaskId(result, router);
  };

  useEffect(() => {
    let x: Models = {};
    for (let i = 0; i < props.getStructure.models.length; i++) {
      x[i + 1] = {};
      for (let j = 0; j < props.getStructure.models[i].chains.length; j++) {
        x[i + 1][props.getStructure.models[i].chains[j].name] =
          props.getStructure.models[i].chains[j];
      }
    }
    setStartingModels(x);
    let y = Object.fromEntries(Object.keys(x["1"]).map((chain) => [chain, []]));

    setResultModel(y);
    setOptionsChains(Object.keys(x["1"]));
    setSelectedChains([Object.keys(x["1"])[0]]);
  }, [props.getStructure.models]);

  const chooseModel = (model: string) => {
    let availableChain = Object.fromEntries(
      Object.keys(startingModels[model]).map((e) => [e, []])
    );
    setResultModel(availableChain);
    setOptionsChains(Object.keys(availableChain));
    setSelectedModel(model);
    setSelectedChains([]);
  };

  const chooseChains = (newChains: string[]) => {
    let choosedChains: string[] = [];
    for (let [key, value] of Object.entries(resultModel)) {
      if (Object.keys(value).length != 0) {
        choosedChains.push(key);
      }
    }
    let tempResult = resultModel;
    // add chain
    newChains
      .filter((x) => !choosedChains.includes(x))
      .forEach((diff) => {
        tempResult[diff] = [[0, 0]];
      });

    // delete chain
    choosedChains
      .filter((x) => !newChains.includes(x))
      .forEach((diff) => {
        tempResult[diff] = [];
      });
    setResultModel(tempResult);
    setSelectedChains(newChains);
  };

  return (
    <div className={styles.scenario}>
      <div className={styles.header}>
        <h2>
          {props.getStructure.fileHashId.length < 5
            ? props.getStructure.fileHashId.toUpperCase()
            : props.fileName}
        </h2>
      </div>
      <div className={styles.select}>
        <p>Select model for analysis</p>
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue={selectedModel}
          optionFilterProp="children"
          onChange={chooseModel}
          filterOption={filterOption}
          options={Object.keys(startingModels).map((e) => {
            return { value: e, label: e };
          })}
        />
        <p>Select chain(s)</p>
        <Select
          mode="multiple"
          style={{ width: 200 }}
          value={selectedChains}
          placeholder="Please select"
          onChange={chooseChains}
          options={optionsChains.map((chain: string) => {
            return { value: chain, label: chain };
          })}
        />
      </div>

      <>
        {selectedChains.map((chain) => (
          <SequenceCard
            key={chain}
            name={chain}
            sequence={startingModels[selectedModel][chain]["sequence"]}
            residuesWithoutAtoms={
              startingModels[selectedModel][chain]["residuesWithoutAtoms"]
            }
            resultModel={resultModel}
            setResultModel={setResultModel}
          />
        ))}
      </>

      <Button
        size="large"
        style={{ marginBottom: "25px" }}
        type="primary"
        shape="round"
        onClick={submit}
        // disabled={Object.values(selectedChains)[0]?.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default FirstScenarioProperties;
