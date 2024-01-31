import styles from "./first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, InputNumber, Tooltip, Space } from "antd";
import { SelectOutlined, ClearOutlined, PlusOutlined } from "@ant-design/icons";
import { single_scenario_request } from "@/types/modelsType";
import NucleotidePanel from "./NucleotidePanel";

type seqtest = {
  [key: number]: seg;
};

type seg = {
  start: number;
  stop: number;
};

const testempty = {
  1: {
    start: 0,
    stop: 0,
  },
};
const SequenceCard = (props: {
  name: string;
  sequence: string;
  indexChain: number;
  residuesWithoutAtoms: number[];
  setResultModel: any;
  resultModel: single_scenario_request;
}) => {
  let arrayChain = props.sequence.toUpperCase().split("");
  const [selectSequence, setSelectSequence] = useState<number[]>([]);
  const [multipleSequence, setMultipleSequence] = useState<seqtest>(testempty);

  useEffect(() => {
    props.resultModel.selections[0].chains[
      props.indexChain
    ].nucleotideRange.fromInclusive = selectSequence[0];
    props.resultModel.selections[0].chains[
      props.indexChain
    ].nucleotideRange.toInclusive = selectSequence[selectSequence.length - 1];
    // FIXME: zrobić ładniej tego use effecta zeby uzyc setstate MUTABLE!!!
  }, [selectSequence]);

  const addNewRange = () => {
    let i: number = Object.keys(multipleSequence).length;
    setMultipleSequence({
      ...multipleSequence,
      [i + 1]: { start: 0, stop: 0 },
    });
    // console.log(props.name);
    // console.log(props.sequence);
    // console.log(props.indexChain);
    // console.log(props.resultModel);
    // console.log(arrayChain);
    console.log(multipleSequence);
  };

  return (
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
      {Object.keys(multipleSequence).map((e) => (
        <NucleotidePanel
          // selectSequence={selectSequence}
          // setSelectSequence={setSelectSequence}
          arrayChain={arrayChain}
          residuesWithoutAtoms={props.residuesWithoutAtoms}
          key={e}
        />
      ))}
    </div>
  );
};

export default SequenceCard;
