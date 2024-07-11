/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../first-scenario/first-scenario.module.css";
import {
  Select,
  Button,
  Alert,
  Radio,
  Space,
  InputNumber,
  Divider,
  Col,
  Row,
} from "antd";
import { Target, structure, Chains } from "../../types/modelsType";
import { QuestionOutlined } from "@ant-design/icons";
import SequenceCard from "../first-scenario/input/SequenceCard";
import type { RadioChangeEvent } from "antd";
import FullChainAnalysis from "./FullChainAnalysis";
import NucleotidePanel from "../first-scenario/NucleotidePanel";
import Link from "next/link";
import { GetTargetId } from "@/utils/secondScenario/getTargetID";

const initModel: Target = {
  "1": {
    ["A"]: {
      name: "",
      sequence: "",
      residuesWithoutAtoms: [],
      continousFragments: [[]],
    },
  },
};

const DefineTarget = (props: { structure: structure; fileName: string }) => {
  const [finalSequence, setFinalSequence] = useState<string>("");
  const [sequenceRange, setSequenceRange] = useState<
    { id: number; chain: [number, number] }[]
  >([{ id: 1, chain: [0, 0] }]);
  const [selectedChain, setSelectedChain] = useState<string>("A");
  const [initialModels, setInitialModels] = useState<Target>(initModel);
  const [chainsToSelect, setChainsToSelect] = useState<string[]>([]);
  const [value, setValue] = useState(1);
  const [model, setModel] = useState<string>("1");
  const [outOfRange, setOutOfRange] = useState<boolean>(false);
  const router = useRouter();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (e.target.value === 1) {
      setSequenceRange([{ id: 1, chain: [0, 0] }]);
    }
  };

  const submit = () => {
    let start = 0;
    let stop = 0;

    if (value == 1) {
      const range = findLongestFragment(
        initialModels[model][selectedChain].continousFragments
      );
      start = range[0];
      stop = range[1];
    } else {
      start = sequenceRange[0].chain[0];
      stop = sequenceRange[0].chain[1];
    }
    let result = {
      targetHashId: props.structure.fileHashId,
      selection: {
        modelName: model,
        chains: [
          {
            name: selectedChain,
            nucleotideRange: {
              fromInclusive: start,
              toInclusive: stop,
            },
          },
        ],
      },
    };

    console.log(result);
    GetTargetId(result, router);
  };

  useEffect(() => {
    let x: Target = {};
    for (let i = 0; i < props.structure.models.length; i++) {
      x[i + 1] = {};
      for (let j = 0; j < props.structure.models[i].chains.length; j++) {
        x[i + 1][props.structure.models[i].chains[j].name] = {
          ...props.structure.models[i].chains[j],
          continousFragments: findContinousFragments(
            props.structure.models[i].chains[j]
          ),
        };
      }
    }
    setInitialModels(x);
    setChainsToSelect(Object.keys(x["1"]));
    setSelectedChain(Object.keys(x["1"])[0]);
  }, [props.structure.models]);

  useEffect(() => {
    if (value === 2) {
      let x = isRangeDiscontinous();
      setOutOfRange(x);
    }
  }, [sequenceRange]);

  const chooseChains = (newChain: string) => {
    setSelectedChain(newChain);
  };

  const chooseModel = (model: string) => {
    setModel(model);
    setSelectedChain(Object.keys(initialModels[model])[0]);
  };

  const findContinousFragments = (chain: Chains) => {
    const mainList: string[] = chain.sequence.split("");
    const excludeList: number[] = chain.residuesWithoutAtoms;

    if (excludeList.length != 0) {
      let result: any = [];
      let sublist: any = [];

      mainList.forEach((item: string, index) => {
        if (excludeList.includes(index)) {
          if (sublist.length > 0) {
            sublist.push(index - 1);
            result.push(sublist);
            sublist = [];
          }
        } else {
          if (sublist.length === 0) {
            sublist.push(index);
          }
        }
      });
      console.log(result);
      return result;
    } else {
      return [[0, mainList.length - 1]];
    }
  };

  const findLongestFragment = (ranges: number[][]) => {
    let maxDifference = 0;
    let longestFragment: number[] = [];

    ranges.forEach((range) => {
      const difference = Math.abs(range[1] - range[0]);
      if (difference > maxDifference) {
        maxDifference = difference;
        longestFragment = range;
      }
    });

    return longestFragment;
  };

  const isRangeDiscontinous = () => {
    let listOfRanges = initialModels[model][selectedChain].continousFragments;
    let finalRange = sequenceRange[0].chain;
    if (finalRange[0] === undefined) {
      return false;
    }
    for (let range of listOfRanges) {
      if (finalRange[0] >= range[0] && finalRange[1] <= range[1]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <div className={styles.scenarioTarget}>
        <h2 style={{ marginBottom: 0 }}>
          {props.structure.fileHashId.length < 5
            ? props.structure.fileHashId.toUpperCase()
            : props.fileName}
        </h2>
        <Divider />
        <div className={styles.specifyTarget}>
          <Row style={{ height: "40px" }}>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <b>Select model:</b>
            </Col>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <Select
                style={{ width: 100 }}
                value={model}
                placeholder="model"
                onChange={chooseModel}
                options={Object.keys(initialModels).map((model: string) => {
                  return { value: model, label: model };
                })}
              />
            </Col>
          </Row>
          <Row style={{ height: "40px" }}>
            <Col
              span={5}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <b>Select chain:</b>
            </Col>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <Select
                style={{ width: 100 }}
                value={selectedChain}
                placeholder="chain"
                onChange={chooseChains}
                options={chainsToSelect.map((chain: string) => {
                  return { value: chain, label: chain };
                })}
              />
            </Col>
          </Row>
          <Row style={{ height: "40px" }}>
            <Col
              span={5}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <b>Analyse:</b>
            </Col>
          </Row>
          <Radio.Group onChange={onChange} value={value}>
            <Space
              direction="vertical"
              style={{ margin: "10px 0px 15px 30px" }}
            >
              <Radio value={1}>
                {initialModels[model][selectedChain].residuesWithoutAtoms
                  .length === 0
                  ? "full chain"
                  : "the longest continuous fragment of chain"}
              </Radio>
              <Radio value={2}>fragment of a chain</Radio>
            </Space>
          </Radio.Group>
          {initialModels[model][selectedChain].residuesWithoutAtoms.length !=
          0 ? (
            <div style={{ maxWidth: "650px", margin: "15px" }}>
              <Alert
                message="The chain is discontinuous. To validate a task, select a continuous fragment of chain."
                type="info"
                showIcon
              />
            </div>
          ) : null}

          {selectedChain != "" &&
            (value == 1 ? (
              <FullChainAnalysis
                sequence={initialModels[model][selectedChain].sequence}
                residuesWithoutAtoms={
                  initialModels[model][selectedChain].residuesWithoutAtoms
                }
                range={findLongestFragment(
                  initialModels[model][selectedChain].continousFragments
                )}
                index={0}
              />
            ) : value == 2 ? (
              <NucleotidePanel
                multipleSequence={sequenceRange}
                setMultipleSequence={setSequenceRange}
                indexSequence={1}
                arrayChain={initialModels[model][selectedChain]["sequence"]
                  .toUpperCase()
                  .split("")}
                residuesWithoutAtoms={
                  initialModels[model][selectedChain]["residuesWithoutAtoms"]
                }
                deleteChainRange={"h"}
                deleteSequenceOption={false}
              />
            ) : null)}
        </div>
        <Divider />
        {outOfRange ? (
          <div style={{ maxWidth: "800px", marginBottom: "20px" }}>
            <Alert
              message="Warning"
              description="The selected fragment contains a discontinuity. To submit the task, select the fragment without grayed out elements."
              type="warning"
              showIcon
            />
          </div>
        ) : null}
        <Button
          size="large"
          style={{ marginBottom: "20px" }}
          type="primary"
          shape="round"
          onClick={submit}
          disabled={
            ((sequenceRange[0].chain[1] - sequenceRange[0].chain[0] < 3 ||
              sequenceRange[0].chain[0] === undefined) &&
              value == 2) ||
            outOfRange
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DefineTarget;
