"use client";
import { useState, useEffect } from "react";
import { Select, Button } from "antd";
import styles from "./components.module.css";
import Structures from "./chains.json";
import SequenceCard from "./SequenceCard";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

type SingleModel = {
  [key: string] : Chain
}

type Chain = {

}


const FirstScenarioProperties = () => {
  const [allModels, setAllModels] = useState<string[]>([]);
  const [allChains, setAllChains] = useState<{ name: string; chain: string }[]>(
    []
  );
  const [modelExample, setModelExample] = useState<{string : [any]}>()
  const [selectedChains, setSelectedChains] = useState<string[]>([]);

  useEffect(() => {
    setAllModels([]);
    setAllChains([]);
    Structures.models.map((model) => {
      setAllModels((allModels) => [...allModels, model.name]);
    });
    Structures.models.map((model) => {
      setModelExample((modelExample) => [...modelExample, {model.name : model.chains}, ]);
    });

    // el.chains.find((chain) => {
    //   chain.name;
    // setAllChains((allChains) => [
    //   ...allChains,
    //   { name: chain.name, chain: chain.sequence },
    // ]);
  }, []);

  const chooseModels = (value: string) => {
    console.log(`selected ${value}`);
    console.log(allModels);
  };

  // const handleChooseChain = (value: string[]) => {
  //   setSelectedChains(value);
  //   console.log(selectedChains);
  // };

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
        // onChange={handleChooseChain}
        options={allChains.map((el) => {
          return { value: el.name, label: el.name };
        })}
      />
      {allChains.map((el) =>
        selectedChains.includes(el.name) ? (
          <SequenceCard key={el.name} name={el.name} chain={el.chain} />
        ) : null
      )}
      <Button size="large" type="primary" shape="round">
        Submit a task
      </Button>
    </div>
  );
};

export default FirstScenarioProperties;
