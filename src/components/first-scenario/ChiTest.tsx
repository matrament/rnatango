"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";
import { AngleIcon } from "../icons/Icons";
import anglesnames from "../../angles.json";
import styles from "./first-scenario.module.css";

const ChiTest = (props: { angle: (number | null)[]; title: string }) => {
  const [angleResult, setAngleResult] = useState<[number, number][]>([]);
  const [syn, setSyn] = useState<[number, number][]>([[2, 167.5]]);
  const [anti, setAnti] = useState<[number, number][]>([
    [2, 27.5],
    [4, -32.25],
  ]);

  useEffect(() => {
    let x: number[] = props.angle.filter(
      (element): element is number => element !== null
    );
    x = x.map((e) => Math.floor((e + 180) / 15));
    let counts: { [key: number]: [number, number] } = {};
    for (let i = 0; i < 24; i++) {
      counts[i] = [0, -172.5 + 15 * i];
    }
    x.forEach(function (x) {
      counts[x][0] = (counts[x][0] || 0) + 1;
    });
    setAngleResult(Object.values(counts).map((e) => [Math.sqrt(e[0]), e[1]]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.angle]);

  const option: ReactEChartsProps["option"] = {
    polar: {},
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          name: `${props.title}`,
        },
      },
      right: "15px",
    },
    tooltip: {
      formatter: function (params: any) {
        return `from ${params.data[1] - 7.5}\u00B0 to ${
          params.data[1] + 7.5
        }\u00B0: ${Math.round(params.data[0] * params.data[0])} ${
          params.data[0] === 1 ? "angle" : "angles"
        }`;
      },
    },
    angleAxis: [
      {
        type: "value",
        min: -180,
        max: 180,
        interval: 15,
        startAngle: 180,
        z: 2,
        axisLabel: {
          formatter: function (value: number) {
            return value + "\u00B0";
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#dcdcdc",
            type: "solid",
          },
        },
      },
    ],

    radiusAxis: [
      {
        min: 0,
        max: function (value) {
          return value.max;
        },
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
        name: "syn",
        type: "bar",
        itemStyle: {
          color: "#04afa4",
        },
        z: 1,
        coordinateSystem: "polar",
        barWidth: "15",
        data: syn,
      },
      {
        name: "anti",
        type: "bar",
        itemStyle: {
          color: "#fb5f4c",
        },
        z: 1,
        coordinateSystem: "polar",
        barWidth: "15",
        data: anti,
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
};
export default ChiTest;
