"use client";
import styles from "./first-scenario.module.css";
import { useEffect, useState } from "react";
import { Button, InputNumber, Tooltip, Space, Popconfirm } from "antd";
import {
  SelectOutlined,
  ClearOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const Nucleobases = (props: {
  name: string;
  index: number;
  onClick: any;
  selectedSequence: any;
  residuesWithoutAtoms: number[];
  discontinuity: number[][];
}) => {
  return (
    <div className={styles.nucleobases} onClick={props.onClick}>
      <div className={styles.index}>
        {props.index % 5 == 0 ? props.index : null}
      </div>
      <div
        className={`${styles.residue} ${
          props.selectedSequence.includes(props.index)
            ? styles.activeC
            : styles.nonactiveC
        }
        ${
          props.discontinuity[0].includes(props.index)
            ? styles.startRange
            : null
        }
        ${props.discontinuity[1].includes(props.index) ? styles.endRange : null}
      ${
        props.residuesWithoutAtoms.includes(props.index) ? styles.disable : null
      }
      `}
      >
        {props.name}
      </div>
    </div>
  );
};

const NucleotidePanel = (props: {
  multipleSequence: { id: number; chain: number[] }[];
  indexSequence: number;
  setMultipleSequence: any;
  arrayChain: string[];
  residuesWithoutAtoms: number[];
  deleteChainRange: any;
  deleteSequenceOption: boolean;
  continousfragments: number[][] | [];
}) => {
  const [selectedSequence, setSelectedSequence] = useState<number[]>([0, 0]);
  const [discontinuity, setDiscontinuity] = useState<number[][]>([[], []]);

  useEffect(() => {
    if (props.deleteSequenceOption) {
      let rangeSequence = range(0, props.arrayChain.length - 1, 1);
      setSelectedSequence(rangeSequence);
    } else {
      setSelectedSequence([]);
    }

    const leftElements: number[] = [];
    const rightElements: number[] = [];

    props.continousfragments.forEach((subList) => {
      leftElements.push(subList[0]);
      rightElements.push(subList[1]);
    });
    leftElements.shift();
    rightElements.pop();
    setDiscontinuity([leftElements, rightElements]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let newSequence = [
      selectedSequence[0],
      selectedSequence[selectedSequence.length - 1],
    ];

    if (selectedSequence.length != 0) {
      props.setMultipleSequence(
        props.multipleSequence.map((item: any) =>
          item.id === props.indexSequence
            ? { ...item, chain: newSequence }
            : item
        )
      );
    } else {
      props.setMultipleSequence(
        props.multipleSequence.map((item: any) =>
          item.id === props.indexSequence ? { ...item, chain: [] } : item
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSequence]);

  const range = (start: number, stop: number, step: number): number[] => {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  };

  const handleAddSequence = (index: number) => {
    if (selectedSequence.length < 1) {
      setSelectedSequence(() => [index]);
    } else {
      if (selectedSequence[0] < index) {
        setSelectedSequence(range(selectedSequence[0], index, 1));
      } else {
        setSelectedSequence(
          range(index, selectedSequence[selectedSequence.length - 1], 1)
        );
      }
    }
  };

  const inputFirstNucleotyde = (value: number | null) => {
    if (value != null) {
      if (
        value < selectedSequence[selectedSequence.length - 1] &&
        selectedSequence.length > 0
      ) {
        setSelectedSequence(
          range(value, selectedSequence[selectedSequence.length - 1], 1)
        );
      } else {
        setSelectedSequence(() => [value]);
      }
    } else {
      setSelectedSequence([selectedSequence[selectedSequence.length - 1]]);
    }
  };

  const inputLastNucleotyde = (value: number | null) => {
    if (value != null && value > selectedSequence[0]) {
      setSelectedSequence(range(selectedSequence[0], value, 1));
    }
    if (value != null && selectedSequence.length == 0) {
      setSelectedSequence(range(1, value, 1));
    }
    if (
      value == null ||
      (value < selectedSequence[0] && selectedSequence.length == 1)
    ) {
      setSelectedSequence([selectedSequence[0]]);
    }
  };

  const handleSelectAll = () => {
    setSelectedSequence(range(0, props.arrayChain.length - 1, 1));
  };
  const handleDeleteAll = () => {
    setSelectedSequence([]);
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
              max={props.arrayChain.length - 1}
              value={selectedSequence[0]}
              placeholder={"from"}
              onChange={inputFirstNucleotyde}
            />
            <InputNumber
              className={styles.input}
              style={{ width: 75 }}
              min={0}
              max={props.arrayChain.length - 1}
              value={selectedSequence[selectedSequence.length - 1]}
              placeholder={"to"}
              onChange={inputLastNucleotyde}
            />
          </Space.Compact>
        </div>
        {props.deleteSequenceOption ? (
          <div style={{ padding: "15px" }}>
            <Popconfirm
              title="Delete chain"
              description="Are you sure to delete this chain?"
              icon={<QuestionCircleOutlined />}
              onConfirm={() => props.deleteChainRange(props.indexSequence)}
            >
              <Button type="text" shape="circle" icon={<CloseOutlined />} />
            </Popconfirm>
          </div>
        ) : null}
      </div>

      <div className={styles.chainsarray}>
        {props.arrayChain.map((el, index) => (
          <Nucleobases
            key={index}
            index={index}
            name={el}
            onClick={() => handleAddSequence(index)}
            selectedSequence={selectedSequence}
            residuesWithoutAtoms={props.residuesWithoutAtoms}
            discontinuity={discontinuity}
          />
        ))}
      </div>
      <div style={{ padding: "15px", fontWeight: "bold" }}>
        Nucleotide range: {selectedSequence[0]}-
        {selectedSequence[selectedSequence.length - 1]}
      </div>
    </>
  );
};
export default NucleotidePanel;
