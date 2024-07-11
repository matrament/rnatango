"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import { second_scenario_result_dataset_single_model } from "@/types/modelsType";
import { Divider } from "antd";
import angles_description from "../../../json/angles_description.json";
import { angles_result } from "../../../types/modelsType";

type ObjectKey = keyof second_scenario_result_dataset_single_model;

const StackedLinePlot = (props: {
  dataset: second_scenario_result_dataset_single_model[];
  requestedAngles: string[];
}) => {
  const [dataset, setDataset] = useState<any>([]);
  useEffect(() => {
    let temp: any = [];

    props.requestedAngles.map((angle, index) => {
      temp.push({
        name: `${angle.toLowerCase()}`,
        type: "line",
        data: props.dataset.map((el) => {
          return el[`${angle.toLowerCase()}` as ObjectKey];
        }),
      });
    });
    setDataset(temp);
  }, [props.dataset]);

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      trigger: "axis",
      // formatter: (params) => {
      //   return params[0].name;
      // },
    },
    legend: {
      data: props.requestedAngles.map((e) => {
        return e.toLowerCase();
      }),
      formatter: function (name) {
        return `${angles_description[name as keyof angles_result]}`;
      },
      width: "70%",
      selected: {
        mcq: true,
        alpha: false,
        beta: false,
        gamma: false,
        delta: false,
        epsilon: false,
        zeta: false,
        eta: false,
        theta: false,
        eta_prim: false,
        theta_prim: false,
        chi: false,
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          excludeComponents: ["dataZoom", "toolbox"],
        },
      },
    },
    xAxis: {
      type: "category",
      data: props.dataset.map((e) => {
        return e.name;
      }),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}°",
      },
    },
    dataZoom: [
      {
        start: 0,
        end: 100,
      },
    ],
    series: dataset,
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>
        Residue-wise angle values
      </h2>
      <p style={{ textAlign: "center", marginTop: "0" }}>
        (click angle name to show/hide line plot)
      </p>
      {dataset.length != 0 ? (
        <ReactECharts
          option={option}
          style={{ height: "70dvh", marginLeft: "30px", marginRight: "30px" }}
        />
      ) : null}
      <Divider />
    </div>
  );
};
export default StackedLinePlot;
