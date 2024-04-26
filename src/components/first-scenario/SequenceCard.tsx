"use client";
import styles from "./first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, Tooltip, Modal, Result } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { single_scenario_request_selection_chain } from "../../types/modelsType";
import NucleotidePanel from "./NucleotidePanel";

const SequenceCard = (props: {
  name: string;
  sequence: string;
  resultModel: any;
  setResultModel: any;
  residuesWithoutAtoms: number[];
  setSelectedChains: any;
  selectedChains: string[];
}) => {
  let arrayChain = props.sequence.toUpperCase().split("");

  const [multipleSequence, setMultipleSequence] = useState<number[][]>([
    [0, 0],
  ]);

  useEffect(() => {
    props.setResultModel({
      ...props.resultModel,
      [props.name]: multipleSequence,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(multipleSequence);
  }, [multipleSequence]);

  const addNewRange = () => {
    setMultipleSequence([...multipleSequence, [0, 0]]);
  };

  const deleteChainRange = (i: number) => {
    console.log(i);
    console.log(multipleSequence.filter((e, index) => index != i));
    setMultipleSequence(multipleSequence.filter((e, index) => index != i));
    if (i === 0 && multipleSequence.length === 1) {
      props.setSelectedChains(
        props.selectedChains.filter((e: string) => e !== props.name)
      );
    }
  };

  return (
    <>
      {multipleSequence.length != 0 ? (
        <div className={styles.sequence}>
          <div className={styles.sequenceTitle}>
            <Tooltip title="Add new nucleotide range">
              <Button
                shape="circle"
                type="text"
                onClick={() => addNewRange()}
                icon={<PlusOutlined />}
              />
            </Tooltip>
            <h3>Chain: {props.name}</h3>
          </div>
          {multipleSequence.map((e, index) => (
            <NucleotidePanel
              multipleSequence={multipleSequence}
              setMultipleSequence={setMultipleSequence}
              deleteChainRange={deleteChainRange}
              indexSequence={index}
              arrayChain={arrayChain}
              residuesWithoutAtoms={props.residuesWithoutAtoms}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SequenceCard;
