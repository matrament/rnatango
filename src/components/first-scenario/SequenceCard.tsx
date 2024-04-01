"use client";
import styles from "./first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, Tooltip, Modal } from "antd";
import { PlusOutlined, QuestionOutlined } from "@ant-design/icons";
import { single_scenario_request_selection_chain } from "../../types/modelsType";
import NucleotidePanel from "./NucleotidePanel";

const SequenceCard = (props: {
  name: string;
  sequence: string;
  indexChain: number;
  residuesWithoutAtoms: number[];
  setConcatRange: any;
  concatRange: single_scenario_request_selection_chain[][];
}) => {
  let arrayChain = props.sequence.toUpperCase().split("");

  const [multipleSequence, setMultipleSequence] = useState<
    single_scenario_request_selection_chain[]
  >([
    {
      name: props.name,
      nucleotideRange: {
        fromInclusive: 0,
        toInclusive: 0,
      },
    },
  ]);

  useEffect(() => {
    let newState = props.concatRange.map((e, index) => {
      if (index === props.indexChain) {
        return multipleSequence;
      }
      return e;
    });
    props.setConcatRange(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleSequence]);

  const addNewRange = () => {
    let x: single_scenario_request_selection_chain = {
      name: props.name,
      nucleotideRange: {
        fromInclusive: 0,
        toInclusive: 0,
      },
    };
    setMultipleSequence([...multipleSequence, x]);
  };

  const deleteChainRange = (index: number) => {
    let newArray: single_scenario_request_selection_chain[] = multipleSequence;
    newArray.splice(index, 1);
    setMultipleSequence([
      {
        name: props.name,
        nucleotideRange: {
          fromInclusive: 0,
          toInclusive: 0,
        },
      },
    ]);
    // console.log(newArray);
    console.log(multipleSequence);
    console.log(index);
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
            <Button size="small" onClick={info} icon={<QuestionOutlined />} />
          </div>
          {multipleSequence.map((e, index) => (
            <NucleotidePanel
              multipleSequence={multipleSequence}
              setMultipleSequence={setMultipleSequence}
              deleteChainRange={deleteChainRange}
              currentSequence={e}
              indexRange={index}
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
