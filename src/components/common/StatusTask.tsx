"use client";

import { Alert, Button, Divider, Steps, Tooltip, message } from "antd";
import { useMediaQuery } from "react-responsive";
import styles from "../../components/first-scenario/first-scenario.module.css";
import { ReloadOutlined } from "@ant-design/icons";

const StatusTask = (props: {
  taskId: string;
  setSeedState: any;
  stepsNumber: number;
  removeDate: string;
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const steps = [
    { title: "Task uploaded" },
    { title: "Queueing" },
    { title: "Processing" },
    {
      title: "Success",
      description: `${
        props.stepsNumber === 4
          ? "Results will be stored until " + props.removeDate
          : ""
      }`,
    },
  ];

  return (
    <div className={styles.scenario}>
      <h1>
        Task ID:{" "}
        <span
          onClick={() => {
            window.navigator["clipboard"].writeText(props.taskId!);
            message.success("Request task id has been saved to clipboard.");
          }}
        >
          <Tooltip title="Click here to copy to clipboard.">
            {props.taskId}
          </Tooltip>
        </span>
      </h1>
      <div className={styles.steps}>
        <Steps
          direction={isDesktop ? "horizontal" : "vertical"}
          current={props.stepsNumber}
          items={steps}
          status="wait"
        />
        {status === "FAILED" ? (
          <Alert
            message="Server error"
            showIcon
            // description={resultSet.error_message}
            type="error"
            style={{ margin: "20px" }}
          />
        ) : (
          <></>
        )}
      </div>
      <Divider />
      <div className={styles.resetSettings}>
        <Button
          disabled={props.stepsNumber < 4}
          icon={<ReloadOutlined />}
          onClick={() =>
            props.setSeedState((prevCount: number) => prevCount + 1)
          }
        >
          Reset settings
        </Button>
      </div>
    </div>
  );
};

export default StatusTask;
