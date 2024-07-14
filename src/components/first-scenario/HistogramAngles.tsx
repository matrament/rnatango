"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";
import { AngleIcon } from "../icons/Icons";
import styles from "./first-scenario.module.css";

const HistogramAngles = (props: {
  angle: (number | null)[];
  title: string;
  fileName: string;
}) => {
  const [angleResult, setAngleResult] = useState<[number, number][]>([]);

  useEffect(() => {
    dataProcess();
  }, [props.angle]);

  const dataProcess: any = () => {
    let counts: { [key: number]: number } = {};

    props.angle.reduce((acc, element) => {
      if (element !== null) {
        let index = 23;
        if (element != 180) {
          index = Math.floor((element + 180) / 15);
        }
        acc[index] = (acc[index] || 0) + 1;
      }
      return acc;
    }, counts);

    let histogramData: [number, number][] = [];

    for (let i = 0; i < 24; i++) {
      histogramData.push([
        Math.sqrt(counts[i] ? counts[i] : 0),
        -172.5 + 15 * i,
      ]);
    }

    setAngleResult(histogramData);
  };

  const option: ReactEChartsProps["option"] = {
    dataset: {
      source: angleResult,
    },
    polar: {},
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          name: `${props.fileName.toLowerCase()}_${props.title}`,
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

  return (
    <div className={styles.histogram}>
      <div className={styles.histogramtitle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <AngleIcon style={{ fontSize: "16px", color: "#fb5f4c" }} />
          <h3>{props.title}</h3>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: "500px" }} />
    </div>
  );
};
export default HistogramAngles;
