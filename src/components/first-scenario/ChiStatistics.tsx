"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";

const ChiStatistics = (props: { angle: any[] }) => {
  const [syn, setSyn] = useState<[number, number][]>([[0, 172.5]]);
  const [anti, setAnti] = useState<[number, number][]>([[0, 127.5]]);

  useEffect(() => {
    let x: number[] = props.angle.filter((e) => {
      return e != null;
    });
    let count = x.filter((e) => e < 120 && e > -30).length;
    setSyn([[Math.sqrt(count), 172.5]]);
    setAnti([[Math.sqrt(x.length - count), 127.5]]);
  }, [props.angle]);

  const option: ReactEChartsProps["option"] = {
    legend: {
      show: true,
      // top: "bottom",
      bottom: "0%",
      itemWidth: 30,
      itemHeight: 30,
      orient: "horizontal",
      align: "auto",
      textStyle: {
        fontSize: 14,
      },
      selectedMode: false,
      borderRadius: 15,
    },
    polar: {},
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          name: `syn_anti_statistics`,
        },
      },
      right: "15px",
    },
    tooltip: {
      formatter: function (params: any) {
        return `${params.seriesName}: ${Math.round(
          params.data[0] * params.data[0]
        )} ${params.data[0] === 1 ? "angle" : "angles"}`;
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
        splitLine: {
          show: false,
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
        max: function (value) {
          return value.max;
        },
        z: 0,
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
        barWidth: "150",
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
        barWidth: "210",
        data: anti,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "500px",
      }}
    >
      <div style={{ width: "100%" }}>
        <ReactECharts option={option} />
      </div>
    </div>
  );
};

export default ChiStatistics;
