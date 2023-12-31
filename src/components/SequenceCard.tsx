import styles from "./components.module.css";
import { useState } from "react";
import { Button, InputNumber, Tooltip, Space } from "antd";
import {
  SelectOutlined,
  ClearOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Nucleobases = (props: {
  name: string;
  index: number;
  onClick: any;
  selectChains: any;
}) => {
  return (
    <button
      className={`${styles.nucleobases} ${
        props.selectChains.includes(props.index)
          ? styles.activeC
          : styles.nonactiveC
      }`}
      onClick={props.onClick}
    >
      <div className={styles.index}>
        {props.index % 5 == 0 ? props.index : null}
      </div>
      <div>{props.name}</div>
    </button>
  );
};

const SequenceCard = (props: { name: string; chain: string }) => {
  let arrayChains = props.chain.toUpperCase().split("");
  const [selectChains, setSelectChains] = useState<number[]>([]);
  const [addedChains, setAddedChains] = useState<number[][]>([]);

  const range = (start: number, stop: number, step: number): number[] => {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  };

  const handleAddChains = (index: number) => {
    if (selectChains.length < 1) {
      setSelectChains(() => [index]);
    } else {
      if (selectChains[0] < index) {
        setSelectChains(range(selectChains[0], index, 1));
      } else {
        setSelectChains(range(index, selectChains[selectChains.length - 1], 1));
      }
    }
  };

  const inputChainsFirst = (value: number | null) => {
    if (value != null) {
      if (
        value < selectChains[selectChains.length - 1] &&
        selectChains.length > 0
      ) {
        setSelectChains(range(value, selectChains[selectChains.length - 1], 1));
      } else {
        setSelectChains(() => [value]);
      }
    } else {
      setSelectChains([selectChains[selectChains.length - 1]]);
    }
    console.log("changed", value);
  };

  const inputChainsEnd = (value: number | null) => {
    if (value != null && value > selectChains[0]) {
      setSelectChains(range(selectChains[0], value, 1));
    }
    if (value != null && selectChains.length == 0) {
      setSelectChains(range(1, value, 1));
    }
    if (
      value == null ||
      (value < selectChains[0] && selectChains.length == 1)
    ) {
      setSelectChains([selectChains[0]]);
    }
    console.log("changed", value);
  };

  const handleSelectAll = () => {
    setSelectChains(range(1, arrayChains.length, 1));
  };

  const handleDeleteAll = () => {
    setSelectChains([]);
  };

  const addNewChain = () => {
    setAddedChains((addedChains) => [...addedChains, selectChains]);
    setSelectChains([]);
    console.log(addedChains);
  };

  const handleDeleteOneChain = (num: number) => {
    setAddedChains(addedChains.splice(num, 1));
    console.log(num);
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
            onClick={() => handleDeleteAll()}
            icon={<ClearOutlined />}
          />
        </Tooltip>
        <Tooltip title="Add new chain">
          <Button
            shape="circle"
            onClick={() => addNewChain()}
            icon={<PlusOutlined />}
          />
        </Tooltip>
        <Space.Compact>
          <InputNumber
            style={{ width: 75 }}
            min={1}
            max={arrayChains.length}
            placeholder={"from"}
            onChange={inputChainsFirst}
          />
          <InputNumber
            className={styles.input}
            style={{ width: 75 }}
            min={1}
            max={arrayChains.length}
            placeholder={"to"}
            onChange={inputChainsEnd}
          />
        </Space.Compact>
      </div>
      <div className={styles.chainsarray}>
        {arrayChains.map((el, index) => (
          <Nucleobases
            key={index}
            index={index + 1}
            name={el}
            onClick={() => handleAddChains(index + 1)}
            selectChains={selectChains}
          />
        ))}
      </div>
      <div>
        chain {addedChains.length + 1}: from: {selectChains[0]} to:{" "}
        {selectChains[selectChains.length - 1]} nucleobases
      </div>
      <div>
        {addedChains.map((el, index) => (
          <div key={index}>
            <p>
              chain {index + 1}: from: {el[0]} to: {el[el.length - 1]}{" "}
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
