"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import { second_scenario_result_dataset_single_model } from "@/types/modelsType";
import { Divider } from "antd";

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
    },
    legend: {
      data: props.requestedAngles.map((e) => {
        return e.toLowerCase();
      }),
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
      //   boundaryGap: false,
      data: props.dataset.map((e) => {
        return e.name;
      }),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}°",
        // customValues: [0, 4, 7, 8, 3000],
      },
    },
    dataZoom: [
      //   {
      //     type: "inside",
      //     start: 0,
      //     end: 10,
      //   },
      {
        start: 0,
        end: 100,
      },
    ],
    series: dataset,
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>Line plot</h2>
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
