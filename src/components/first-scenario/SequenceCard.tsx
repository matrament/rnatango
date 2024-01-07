import styles from "./first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, InputNumber, Tooltip, Space } from "antd";
import {
  SelectOutlined,
  ClearOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { single_scenario_request } from "@/types/modelsType";

const Nucleobases = (props: {
  name: string;
  index: number;
  onClick: any;
  selectSequence: any;
  residuesWithoutAtoms: number[];
}) => {
  return (
    <div className={styles.nucleobases} onClick={props.onClick}>
      <div className={styles.index}>
        {props.index % 5 == 0 ? props.index : null}
      </div>
      <div
        className={`${styles.residue} ${
          props.selectSequence.includes(props.index)
            ? styles.activeC
            : styles.nonactiveC
        }
      ${
        props.residuesWithoutAtoms.includes(props.index) ? styles.disable : null
      }`}
      >
        {props.name}
      </div>
    </div>
  );
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
  const [addedSequence, setAddedSequence] = useState<number[][]>([]);

  useEffect(() => {
    props.resultModel.selections[0].chains[
      props.indexChain
    ].nucleotideRange.fromInclusive = selectSequence[0];
    props.resultModel.selections[0].chains[
      props.indexChain
    ].nucleotideRange.toInclusive = selectSequence[selectSequence.length - 1];
    // FIXME: zrobić ładniej tego use effecta zeby uzyc setstate
  }, [selectSequence]);

  const range = (start: number, stop: number, step: number): number[] => {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  };

  const handleAddSequence = (index: number) => {
    if (selectSequence.length < 1) {
      setSelectSequence(() => [index]);
    } else {
      if (selectSequence[0] < index) {
        setSelectSequence(range(selectSequence[0], index, 1));
      } else {
        setSelectSequence(
          range(index, selectSequence[selectSequence.length - 1], 1)
        );
      }
    }
  };

  const inputFirstNucleotyde = (value: number | null) => {
    if (value != null) {
      if (
        value < selectSequence[selectSequence.length - 1] &&
        selectSequence.length > 0
      ) {
        setSelectSequence(
          range(value, selectSequence[selectSequence.length - 1], 1)
        );
      } else {
        setSelectSequence(() => [value]);
      }
    } else {
      setSelectSequence([selectSequence[selectSequence.length - 1]]);
    }
  };

  const inputLastNucleotyde = (value: number | null) => {
    if (value != null && value > selectSequence[0]) {
      setSelectSequence(range(selectSequence[0], value, 1));
    }
    if (value != null && selectSequence.length == 0) {
      setSelectSequence(range(1, value, 1));
    }
    if (
      value == null ||
      (value < selectSequence[0] && selectSequence.length == 1)
    ) {
      setSelectSequence([selectSequence[0]]);
    }
  };

  const handleSelectAll = () => {
    setSelectSequence(range(1, arrayChain.length, 1));

    // let x = {
    //   ...props.resultModel,
    //   selections: [
    //     {
    //       ...props.resultModel.selections,
    //       chains: [
    //         ...props.resultModel.selections.chains,
    //         { name: props.name },
    //       ],
    //     },
    //   ],
    // };
    // console.log(x);
  };

  const handleDeleteAll = () => {
    setSelectSequence([]);
  };

  const addNewNucleotideRange = () => {
    setAddedSequence((addedSequence) => [...addedSequence, selectSequence]);
    setSelectSequence([]);
  };

  const handleDeleteOneChain = (num: number) => {
    setAddedSequence(addedSequence.splice(num, 1));
  };

  return (
    <div className={styles.sequence}>
      <h3>Chain: {props.name}</h3>
      <div className={styles.menuchains}>
        <Tooltip title="Select all">
          <Button
            shape="circle"
            onClick={() => handleSelectAll()}
            icon={<SelectOutlined />}
          />
        </Tooltip>
        <Tooltip title="Clear recent">
          <Button
            shape="circle"
            onClick={() => handleDeleteAll()} // FIXME: change icon
            icon={<ClearOutlined />}
          />
        </Tooltip>
        <Tooltip title="Add new nucleotide range">
          <Button
            shape="circle"
            onClick={() => addNewNucleotideRange()}
            disabled
            icon={<PlusOutlined />}
          />
        </Tooltip>
        <Space.Compact>
          <InputNumber
            style={{ width: 75 }}
            min={1}
            max={arrayChain.length}
            value={selectSequence[0]}
            placeholder={"from"}
            onChange={inputFirstNucleotyde}
          />
          <InputNumber
            className={styles.input}
            style={{ width: 75 }}
            min={1}
            max={arrayChain.length}
            value={selectSequence[selectSequence.length - 1]}
            placeholder={"to"}
            onChange={inputLastNucleotyde}
          />
        </Space.Compact>
      </div>
      <div className={styles.chainsarray}>
        {arrayChain.map((el, index) => (
          <Nucleobases
            key={index}
            index={index + 1}
            name={el}
            onClick={() => handleAddSequence(index + 1)}
            selectSequence={selectSequence}
            residuesWithoutAtoms={props.residuesWithoutAtoms}
          />
        ))}
      </div>
      <div>
        Nucleotide range {addedSequence.length + 1}: from {selectSequence[0]} to{" "}
        {selectSequence[selectSequence.length - 1]} nucleobases
      </div>
      <div>
        {addedSequence.map((el, index) => (
          <div key={index}>
            <p>
              Nucleotide range {index + 1}: from {el[0]} to {el[el.length - 1]}{" "}
              nucleobases
            </p>
            <Button
              shape="circle"
              onClick={() => handleDeleteOneChain(index)}
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceCard;
