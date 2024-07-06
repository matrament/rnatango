"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import styles from "../../first-scenario/first-scenario.module.css";
import { DotChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Divider, Space, Switch } from "antd";
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
  const [datasetDiscrete, setDatasetDiscrete] = useState<number[][]>([]);
  const [datasetContinous, setDatasetContinous] = useState<number[][]>([]);
  const [residue, setResidue] = useState<string[]>([]);
  const [continous, setContinous] = useState<boolean>(true);
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  useEffect(() => {
    let temp_continous: number[][] = [];
    let temp_discrete: number[][] = [];
    let xAxis: string[] = [];

    props.dataset.map((residue, index) => {
      xAxis.push(residue["dotbracket"] as string);
      for (let i = 0; i < props.models.length; i++) {
        temp_discrete.push([index, i, residue[`${props.models[i]}`] as number]);
        temp_continous.push([
          index,
          i,
          Math.log(residue[`${props.models[i]}`] as number),
        ]);
      }
    });
    setDatasetDiscrete(temp_discrete);
    setDatasetContinous(temp_continous);
    setResidue(xAxis);
  }, [props.dataset]);

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      position: "top",
      trigger: "axis",
      valueFormatter: (value: any) =>
        `${continous ? Math.round(Math.E ** value) : Number(value.toFixed(2))}`,
      axisPointer: {
        lineStyle: {
          color: "#b93636",
          width: 1,
        },
      },
    },
    grid: {
      left: "15%",
      right: "left",
      height: `${props.models.length * 15}%`,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          excludeComponents: ["visualMap", "toolbox"],
        },
      },
    },
    xAxis: [
      {
        type: "category",
        data: residue,
        splitArea: {
          show: true,
        },
        position: "top",
      },
      {
        type: "category",
        data: residue,
        splitArea: {
          show: false,
        },
        position: "bottom",
      },
    ],
    yAxis: {
      type: "category",
      // data: props.models,
      splitArea: {
        show: true,
      },
      data: props.models.map((model) => {
        return {
          value: `${model}`,
          textStyle: {
            fontSize: 13,
            overflow: "breakAll",
          },
        };
      }),
    },
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        // right: 10,
        start: 0,
        end: 100,
      },
      {
        type: "inside",
        xAxisIndex: 1,
        // right: 10,
        start: 0,
        end: 100,
      },
    ],
    visualMap: [
      {
        min: 0,
        max: continous ? Math.log(180) : 180,
        calculable: true,
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
        data: continous ? datasetContinous : datasetDiscrete,

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
      <h2 style={{ textAlign: "center", marginTop: "0" }}>Heatmap...</h2>
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
      <Divider />
    </div>
  );
};

export default HeatMap;
