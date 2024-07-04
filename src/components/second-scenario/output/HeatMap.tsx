"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import styles from "../../first-scenario/first-scenario.module.css";
import { DotChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";
import { useMediaQuery } from "react-responsive";

const hours = [
  "(",
  "(",
  "(",
  "(",
  "(",
  "(",
  "(",
  "(",
  "(",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  "[",
  "[",
  "[",
  ".",
  ".",
  ".",
  ".",
];
// prettier-ignore
const days = [
    'Saturday', 'Friday', 
];
// prettier-ignore

type datasetModels = {
    [key: string]: string | number;
};

const HeatMap = (props: { dataset: datasetModels[]; models: string[] }) => {
  const [continous, setContinous] = useState<boolean>(true);
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  let data: number[][] = [];
  props.dataset.map(function (item) {
    data.push([
      item["key"] as number,
      1,
      Math.log(item[props.models[1]] as number),
    ]);
  });
  props.dataset.map(function (item) {
    data.push([
      item["key"] as number,
      0,
      Math.log(item[props.models[0]] as number),
    ]);
  });

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      position: "top",
      trigger: "axis",
      valueFormatter: (value: any) =>
        `${continous ? Math.round(Math.E ** value) : value}`,
      axisPointer: {
        lineStyle: {
          color: "#b93636",
          width: 1,
        },
      },
    },
    grid: {
      height: `${props.models.length * 15}%`,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          excludeComponents: ["visualMap", "toolbox"],
        },
      },
    },
    xAxis: {
      type: "category",
      data: hours,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: props.models,
      splitArea: {
        show: true,
      },
    },
    // dataZoom: [
    //   {
    //     type: "slider",
    //     xAxisIndex: 0,
    //     // right: 10,
    //     start: 0,
    //     end: 100,
    //   },
    // ],
    visualMap: [
      {
        min: 0,
        max: continous ? Math.log(180) : 180,
        calculable: true,
        // type: "continuous",
        type: `${continous ? "continuous" : "piecewise"}`,
        orient: "horizontal",
        left: "center",
        itemWidth: 26,
        // inRange: {
        //   color: ["#ffff", "#fb5f4c"], //From smaller to bigger value ->
        // },
        splitNumber: 4,
        inRange: {
          color: [
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        bottom: "10%",
        formatter: function (value: any) {
          return `${continous ? Math.round(Math.E ** value) : value}`;
        },
      },
    ],
    series: [
      {
        name: "MCQ value",
        type: "heatmap",
        data: data,
        label: {
          show: true,
          formatter: function (params: any) {
            return `${
              continous
                ? (Math.E ** params.data[2]).toFixed(2)
                : params.data[2].toFixed(2)
            }`;
          },
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <Switch
        style={{ marginLeft: "30px" }}
        checkedChildren={<LineChartOutlined />}
        unCheckedChildren={<DotChartOutlined />}
        defaultChecked
        onChange={(checked: boolean) => setContinous(checked)}
      />
      <ReactECharts
        option={option}
        style={{ height: "30dvh", marginLeft: "30px", marginRight: "30px" }}
      />
    </div>
  );
};

export default HeatMap;
