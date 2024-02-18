import styles from "./first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, InputNumber, Tooltip, Space, Popconfirm } from "antd";
import {
  SelectOutlined,
  ClearOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { single_scenario_request_selection_chain } from "@/types/modelsType";

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

const NucleotidePanel = (props: {
  multipleSequence: single_scenario_request_selection_chain[];
  currentSequence: single_scenario_request_selection_chain;
  indexRange: number;
  setMultipleSequence: any;
  arrayChain: string[];
  residuesWithoutAtoms: number[];
  deleteChainRange: any;
}) => {
  const [selectSequence, setSelectSequence] = useState<number[]>([]);

  useEffect(() => {
    let start = props.currentSequence.nucleotideRange.fromInclusive;
  }, [props.currentSequence]);

  useEffect(() => {
    let newState = props.multipleSequence.map((e, index) => {
      if (index === props.indexRange) {
        return {
          ...e,
          nucleotideRange: {
            fromInclusive: selectSequence[0],
            toInclusive: selectSequence[selectSequence.length - 1],
          },
        };
      }
      return e;
    });
    props.setMultipleSequence(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setSelectSequence(range(0, props.arrayChain.length, 1));
  };
  const handleDeleteAll = () => {
    setSelectSequence([]);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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

          <Space.Compact>
            <InputNumber
              style={{ width: 75 }}
              min={0}
              max={props.arrayChain.length}
              value={selectSequence[0]}
              placeholder={"from"}
              onChange={inputFirstNucleotyde}
            />
            <InputNumber
              className={styles.input}
              style={{ width: 75 }}
              min={0}
              max={props.arrayChain.length}
              value={selectSequence[selectSequence.length - 1]}
              placeholder={"to"}
              onChange={inputLastNucleotyde}
            />
          </Space.Compact>
        </div>
        <div style={{ padding: "15px" }}>
          <Popconfirm
            title="Delete pot"
            description="Are you sure to delete this pot?"
            icon={<QuestionCircleOutlined />}
            onConfirm={() => props.deleteChainRange(props.indexRange)}
          >
            <Button type="text" shape="circle" icon={<CloseOutlined />} />
          </Popconfirm>
        </div>
      </div>

      <div className={styles.chainsarray}>
        {props.arrayChain.map((el, index) => (
          <Nucleobases
            key={index}
            index={index}
            name={el}
            onClick={() => handleAddSequence(index)}
            selectSequence={selectSequence}
            residuesWithoutAtoms={props.residuesWithoutAtoms}
          />
        ))}
      </div>
      <div
        style={{ padding: "15px", marginBottom: "10px", fontWeight: "bold" }}
      >
        Nucleotide range: from {selectSequence[0]} to{" "}
        {selectSequence[selectSequence.length - 1]} nucleobases
      </div>
    </>
  );
};
export default NucleotidePanel;
