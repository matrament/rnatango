import { ReactECharts } from "./ReactECharts";
import { ReactEChartsProps } from "./ReactECharts";

const TestHistogram = () => {
  const option: ReactEChartsProps["option"] = {
    dataset: {
      source: [
        [2, 7.5],
        [0.5, 97.5],
        [1.5, -97.5],
        [1.34322, -172.5],
      ],
    },
    polar: {},
    tooltip: {},
    angleAxis: [
      {
        type: "value",
        min: -180,
        max: 180,
        interval: 15,
        startAngle: 180,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e1e6f1",
            type: "solid",
          },
        },
      },
    ],

    radiusAxis: [
      {
        min: 0,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
    ],

    series: [
      {
        type: "bar",
        itemStyle: {
          color: "#04afa4",
        },
        z: 1,
        coordinateSystem: "polar",
        barWidth: "15",
      },
    ],
  };

  return <ReactECharts option={option} />;
};
export default TestHistogram;
