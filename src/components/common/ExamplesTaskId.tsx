"use client";
import styles from "./first-scenario.module.css";
import { Button, Space, Tooltip } from "antd";
import { message } from "antd";
import lang from "../../utils/lang.json";
import config from "../../config.json";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const ExamplesTaskId = (props: {
  router: any;
  loading: boolean;
  setLoading: any;
  scenario: "one-many" | "many-many";
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const example = [
    {
      name: "1",
      tooltip: {
        "one-many":
          "Models (predicted in RNA-Puzzles 18 by Lee, Szachniuk, and YagoubAli) vs target (5TPY)",
        "many-many":
          "5TPY and its predictions from RNA-Puzzles 18 (by Lee, Szachniuk, and YagoubAli)",
      },
    },
    {
      name: "2",
      tooltip: {
        "one-many":
          "Models (predicted in RNA-Puzzles 18 by Chen, Das, and YagoubAli) vs target (Ding's prediction)",
        "many-many": "1A9N and its 9 decoys generated in silico",
      },
    },
    {
      name: "3",
      tooltip: {
        "one-many":
          "Models (predicted in RNA-Puzzles 18 by Dokholyan, Szachniuk, and YagoubAli) vs target (Chen's prediction)",
        "many-many":
          "4 predictions from RNA-Puzzles 18 (by Chen, Dokholyan, Szachniuk, and YagoubAli)",
      },
    },
  ];

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Space.Compact>
        {example.map((el) => (
          <Tooltip
            key={el.name}
            title={
              props.scenario == "one-many"
                ? el.tooltip["one-many"]
                : el.tooltip["many-many"]
            }
          >
            <Button
              key={el.name}
              disabled={loading}
              onClick={(e) => {
                getTaskId(
                  el.name,
                  props.scenario,
                  props.router,
                  props.setLoading
                );
                setLoading(true);
                props.setLoading(true);
              }}
            >
              {el.name}
            </Button>
          </Tooltip>
        ))}
      </Space.Compact>
      {loading ? (
        <div style={{ display: "flex", gap: "10px" }}>
          {props.scenario == "one-many" ? (
            <b>
              You will be redirected to another page.
              <br />
              This may take a while...
            </b>
          ) : (
            <b>Data is loading. This may take a while...</b>
          )}
          <LoadingOutlined />
        </div>
      ) : null}
    </div>
  );
};

export default ExamplesTaskId;

function getTaskId(
  example: string,
  scenario: "one-many" | "many-many",
  router: any,
  setLoading: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(`${config.SERVER_URL}/${scenario}/example/${example}`, requestOptions)
    .then((response: any) => {
      if (response.status == 404) {
        message.error(lang.error_uploading);
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "" && response != undefined) {
        router.push(
          scenario == "one-many"
            ? `/target-model?id=${response.taskId}`
            : `/?scenario=3&id=${response.taskId}`
        );
        setLoading(false);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
