/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../first-scenario/first-scenario.module.css";
import { Select, Button, Modal, Radio } from "antd";
import { Models, structure } from "../../types/modelsType";
import { QuestionOutlined } from "@ant-design/icons";
import SequenceCard from "../first-scenario/input/SequenceCard";
import type { RadioChangeEvent } from "antd";

// const filterOption = (
//   input: string,
//   option?: { label: string; value: string }
// ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

type resultType = {
  [key: string]: number[][];
};

const SelectChain = (props: { getStructure: structure; fileName: string }) => {
  const [resultModel, setResultModel] = useState<resultType>({});
  const [selectedModel, setSelectedModel] = useState<string>("1");
  const [selectedChains, setSelectedChains] = useState<string[] | []>([]);
  const [initialModels, setInitialModels] = useState<any>([]);
  const [chainsToSelect, setChainsToSelect] = useState<string[]>([]);
  const [value, setValue] = useState(1);
  const router = useRouter();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
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
    setInitialModels(x);
    let y = Object.fromEntries(Object.keys(x["1"]).map((chain) => [chain, []]));

    setResultModel(y);
    setChainsToSelect(Object.keys(x["1"]));
    setSelectedChains([Object.keys(x["1"])[0]]);
  }, [props.getStructure.models]);

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

  const info = () => {
    Modal.info({
      title: "How to submit a task?",
      content: (
        <div>
          <p>
            Select at least one chain. By default, the entire range of
            nucleotides is selected. If you want to change the range, be sure to
            mark at least 3 nucleobases. Otherwise the submit button will be
            unavailable.
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div>
      <div className={styles.select}>
        <p>Model for analysis: 1</p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p>Select chain</p>
          <Button size="small" onClick={info} icon={<QuestionOutlined />} />
        </div>
        <Select
          style={{ width: 200 }}
          value={selectedChains}
          placeholder="Please select"
          onChange={chooseChains}
          options={chainsToSelect.map((chain: string) => {
            return { value: chain, label: chain };
          })}
        />
      </div>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Analyse the whole chain</Radio>
        <Radio value={2}>Analyze a fragment of a chain</Radio>
      </Radio.Group>
      {value == 2 ? (
        <>
          {selectedChains.map((chain) => (
            <SequenceCard
              key={chain}
              name={chain}
              sequence={initialModels[selectedModel][chain]["sequence"]}
              residuesWithoutAtoms={
                initialModels[selectedModel][chain]["residuesWithoutAtoms"]
              }
              resultModel={resultModel}
              setResultModel={setResultModel}
              setSelectedChains={setSelectedChains}
              selectedChains={selectedChains}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default SelectChain;
