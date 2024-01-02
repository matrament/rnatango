"use client";
import { useState, useEffect } from "react";
import { Select, Button } from "antd";
import styles from "./first-scenario.module.css";
import Structures from "../chains.json";
import SequenceCard from "./SequenceCard";
import { Models, SingleModel, Chains } from "../../types/modelsType";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const FirstScenarioProperties = () => {
  const [allModels, setAllModels] = useState<string[]>([]);
  const [allChains, setAllChains] = useState<{ [key: string]: string[] }>({});
  const [modelExample, setModelExample] = useState<Models>({});
  const [selectedChains, setSelectedChains] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    setAllModels([]);
    let x: Models = {};
    for (let i = 0; i < Structures.models.length; i++) {
      x[i + 1] = {};
      for (let j = 0; j < Structures.models[i].chains.length; j++) {
        x[i + 1][Structures.models[i].chains[j].name] =
          Structures.models[i].chains[j];
      }
    }
    setModelExample(x);
    setAllModels(Object.keys(x));
    setAllChains({ ["1"]: Object.keys(x["1"]) });
  }, []);

  const testFunc = () => {
    console.log(modelExample);
  };

  const chooseModels = (value: string) => {
    setAllChains({ [value]: Object.keys(modelExample[value]) });
  };

  const handleChooseChain = (value: string[]) => {
    setSelectedChains({ [Object.keys(allChains)[0]]: value });
  };

  return (
    <div className={styles.scenario}>
      <h3>{Structures.fileHashId.toUpperCase()}</h3>
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
      {Object.values(selectedChains)[0]?.length != 0 ? (
        <>
          {Object.values(selectedChains)[0]?.map((el) => (
            <SequenceCard
              key={el}
              name={el}
              chain={
                modelExample[Object.keys(selectedChains)[0]][el]["sequence"]
              }
              residuesWithoutAtoms={
                modelExample[Object.keys(selectedChains)[0]][el][
                  "residuesWithoutAtoms"
                ]
              }
            />
          ))}
          <Button
            size="large"
            type="primary"
            shape="round"
            onClick={() => testFunc()}
          >
            Submit a task
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default FirstScenarioProperties;
