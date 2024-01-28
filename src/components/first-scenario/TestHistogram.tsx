import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";
import { AngleIcon } from "../icons/Icons";
import styles from "./first-scenario.module.css";

const TestHistogram = (props: { angle: any[]; title: string }) => {
  const [angleResult, setAngleResult] = useState<[number, number][]>([]);

  useEffect(() => {
    let x = props.angle.filter((e) => {
      return e != null;
    });
    x = x.map((e) => (e == null ? null : Math.floor((e + 180) / 15)));
    let counts: { [key: number]: [number, number] } = {};
    for (let i = 0; i < 24; i++) {
      counts[i] = [0, -172.5 + 15 * i];
    }
    x.forEach(function (x) {
      counts[x][0] = (counts[x][0] || 0) + 1;
    });
    setAngleResult(Object.values(counts).map((e) => [Math.sqrt(e[0]), e[1]]));
  }, [props.angle]);

  const option: ReactEChartsProps["option"] = {
    dataset: {
      source: angleResult,
    },
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
        }\u00B0: ${Math.round(params.data[0] * params.data[0])} angle(s)`;
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
        <h3>
          <AngleIcon style={{ fontSize: "16px", color: "#ed6a5a" }} />
          {"  "}
          {props.title}
        </h3>
      </div>
      <ReactECharts option={option} />
    </div>
  );
};
export default TestHistogram;
