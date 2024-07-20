/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./first-scenario.module.css";
import { Select, Button, Modal, Row, Col, Divider } from "antd";
import { Models, structure } from "../../types/modelsType";
import { QuestionOutlined } from "@ant-design/icons";
import { getTaskId } from "../../utils/getTaskId";
import SequenceCard from "./input/SequenceCard";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

type resultType = {
  [key: string]: number[][];
};

const RequestForm = (props: { structure: structure; fileName: string }) => {
  const [resultModel, setResultModel] = useState<resultType>({});
  const [selectedModel, setSelectedModel] = useState<string>("1");
  const [selectedChains, setSelectedChains] = useState<string[] | []>([]);
  const [startingModels, setStartingModels] = useState<any>([]);
  const [optionsChains, setOptionsChains] = useState<string[]>([]);
  const [correctSubmit, setCorrectSubmit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submit = () => {
    setLoading(true);
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
      fileId: props.structure.fileHashId,
      selections: [
        {
          modelName: selectedModel,
          chains: y,
        },
      ],
    };
    getTaskId(result, router, setLoading, "single", "result");
  };

  useEffect(() => {
    let x: Models = {};
    for (let i = 0; i < props.structure.models.length; i++) {
      let combinedSequences: any = {};
      props.structure.models[i].chains.forEach((obj) => {
        if (combinedSequences[obj.name]) {
          combinedSequences[obj.name].sequence += obj.sequence;
          combinedSequences[obj.name].residuesWithoutAtoms.push(
            ...obj.residuesWithoutAtoms
          );
        } else {
          combinedSequences[obj.name] = { ...obj };
        }
      });
      x[i + 1] = combinedSequences;
    }
    setStartingModels(x);
    let y = Object.fromEntries(Object.keys(x["1"]).map((chain) => [chain, []]));

    setResultModel(y);
    setOptionsChains(Object.keys(x["1"]));
    setSelectedChains([Object.keys(x["1"])[0]]);
  }, [props.structure.models]);

  useEffect(() => {
    const hasNonEmptyArray = Object.values(resultModel).some(
      (value) => Array.isArray(value) && isNonEmptyArray(value)
    );
    setCorrectSubmit(hasNonEmptyArray);
  }, [resultModel]);

  const isNonEmptyArray = (array: any[]): boolean => {
    return array.flat().length > 0;
  };

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
    <div className={styles.scenario}>
      <h2 style={{ marginBottom: 0 }}>
        {props.structure.fileHashId.length < 5
          ? props.structure.fileHashId.toUpperCase()
          : props.fileName}
      </h2>
      <Divider />
      <Col>
        <Row>
          <Col span={5} style={{ display: "flex", alignItems: "center" }}>
            <p>Select model for analysis: </p>
          </Col>
          <Col span={5} style={{ display: "flex", alignItems: "center" }}>
            <Select
              showSearch
              style={{ width: 100 }}
              defaultValue={selectedModel}
              optionFilterProp="children"
              onChange={chooseModel}
              filterOption={filterOption}
              options={Object.keys(startingModels).map((e) => {
                return { value: e, label: e };
              })}
            />
          </Col>
        </Row>

        <Row style={{ marginBottom: "10px" }}>
          <Col
            span={5}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <p>Select chain(s):</p>
            <Button
              size="small"
              type="text"
              onClick={info}
              icon={<QuestionOutlined />}
            />
          </Col>
          <Col span={5} style={{ display: "flex", alignItems: "center" }}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              value={selectedChains}
              placeholder="Please select"
              onChange={chooseChains}
              options={optionsChains.map((chain: string) => {
                return { value: chain, label: chain };
              })}
            />
          </Col>
        </Row>

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
              setSelectedChains={setSelectedChains}
              selectedChains={selectedChains}
            />
          ))}
        </>
      </Col>

      <Button
        size="large"
        style={{ marginBottom: "20px" }}
        type="primary"
        shape="round"
        onClick={submit}
        loading={loading}
        disabled={!correctSubmit || selectedChains.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default RequestForm;
