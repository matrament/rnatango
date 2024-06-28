"use client";
import styles from "../first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import NucleotidePanel from "../NucleotidePanel";

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

  const [multipleSequence, setMultipleSequence] = useState<
    { id: number; chain: number[] }[]
  >([{ id: 0, chain: [0, 0] }]);
  const [indexChain, setIndexChain] = useState<number>(0);

  useEffect(() => {
    props.setResultModel({
      ...props.resultModel,
      [props.name]: multipleSequence.map((item) => item.chain),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleSequence]);

  const addNewRange = () => {
    setMultipleSequence([
      ...multipleSequence,
      { id: indexChain + 1, chain: [0, 0] },
    ]);
    setIndexChain(indexChain + 1);
  };

  const deleteChainRange = (id: number) => {
    setMultipleSequence(multipleSequence.filter((seq) => seq.id != id));
    if (multipleSequence.length === 1) {
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
          {multipleSequence.map((sequence) => (
            <NucleotidePanel
              multipleSequence={multipleSequence}
              setMultipleSequence={setMultipleSequence}
              deleteChainRange={deleteChainRange}
              indexSequence={sequence.id}
              arrayChain={arrayChain}
              residuesWithoutAtoms={props.residuesWithoutAtoms}
              key={sequence.id}
              deleteSequenceOption={true}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SequenceCard;
