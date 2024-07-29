"use client";

import { Alert, Button, Divider, Row, Steps, Tooltip, message } from "antd";
import { useMediaQuery } from "react-responsive";
import styles from "../../components/first-scenario/first-scenario.module.css";
import { ReloadOutlined } from "@ant-design/icons";

const StatusTask = (props: {
  taskId: string;
  setSeedState: any;
  stepsNumber: number;
  error: boolean;
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
    <div className={styles.scenario} style={{ width: "100%" }}>
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
      <Row justify={"center"}>
        <div className={styles.steps}>
          <Steps
            direction={isDesktop ? "horizontal" : "vertical"}
            current={props.stepsNumber}
            items={steps}
            status={props.error ? "error" : "wait"}
          />
        </div>
      </Row>

      <div className={styles.resetSettings}>
        <Button
          disabled={props.stepsNumber < 4}
          size="small"
          icon={<ReloadOutlined />}
          onClick={() =>
            props.setSeedState((prevCount: number) => prevCount + 1)
          }
        >
          Reload result page
        </Button>
      </div>
    </div>
  );
};

export default StatusTask;
