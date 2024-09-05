"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";
import { AngleIcon } from "../icons/Icons";
import styles from "./first-scenario.module.css";
import angle_description from "./../../json/angles_description.json";
import { DashOutlined } from "@ant-design/icons";
const HistogramAngles = (props: {
  angle: (number | null)[];
  title: string;
  fileName: string;
  avgRange: [number, number, number];
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
    polar: [{}, {}, {}],
    toolbox: {
      itemSize: 30.5,
      show: true,
      top: "35",
      feature: {
        saveAsImage: {
          name: `${props.fileName.toLowerCase()}_${props.title}`,
          title: "",
          icon: "M 512.00001,0 A 512.00001,512.00001 0 0 0 0,512.00001 512.00001,512.00001 0 0 0 512.00001,1023.9999 512.00001,512.00001 0 0 0 1024,512.00001 512.00001,512.00001 0 0 0 512.00001,0 Z m -12.20857,284.26285 h 35.20286 c 2.58136,0 4.69428,2.06417 4.69428,4.58857 v 194.15143 h 43.47428 c 3.93096,0 6.10268,4.41662 3.69716,7.4 L 521.14859,571.7 a 4.6936599,4.5898295 0 0 1 -7.3943,0 l -65.71142,-81.35427 c -2.40552,-2.9834 -0.23384,-7.40002 3.69714,-7.40002 h 43.35714 V 288.85143 c 0,-2.52441 2.11276,-4.58857 4.69429,-4.58858 z M 302.71715,551.61999 h 35.20286 c 2.58153,0 4.69428,2.0642 4.69428,4.58859 v 88.35429 h 349.67429 v -88.35429 c 0,-2.52438 2.11277,-4.58859 4.69428,-4.58859 h 35.20287 c 2.58138,0 4.69428,2.0642 4.69428,4.58859 v 113.6 c 0,10.15498 -8.3895,18.35998 -18.77428,18.35998 H 316.79715 c -10.38479,0 -18.77429,-8.20502 -18.77429,-18.35998 v -113.6 c 0,-2.52438 2.11276,-4.58859 4.69429,-4.58859 z",
          iconStyle: {
            color: "#fb5f4c",
            borderColor: "#fff",
            borderWidth: 0.2,
          },
          emphasis: {
            iconStyle: {
              color: "#ff8a75",
              borderColor: "#fff",
              borderWidth: 0.2,
            },
          },
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
        polarIndex: 0,
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
      {
        type: "value",
        polarIndex: 1,
        z: 5,
        startAngle: props.avgRange[0],
        min: 0,
        max: 100,
        endAngle: props.avgRange[2],
        interval: 100,
        splitLine: {
          show: props.avgRange[1] == 0 ? false : true,
          lineStyle: {
            color: "#fb5f4c",
            width: 2,
            type: "dashed",
          },
        },
        splitArea: {
          show: props.avgRange[1] == 0 ? false : true,
          areaStyle: {
            color: ["rgba(250,250,250,0)", "rgba(4, 175, 164,0.2)"],
          },
        },
        axisLabel: {
          show: false,
        },
      },
      {
        type: "value",
        polarIndex: 2,
        z: 5,
        startAngle: props.avgRange[1],
        min: 0,
        max: 100,
        endAngle: props.avgRange[1],
        interval: 100,
        splitLine: {
          show: props.avgRange[1] == 0 ? false : true,
          lineStyle: {
            color: "#fb5f4c",
            width: 2.5,
            type: "solid",
          },
        },
        axisLabel: {
          show: false,
        },
      },
    ],

    radiusAxis: [
      {
        min: 0,
        polarIndex: 0,
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
      {
        polarIndex: 1,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      {
        polarIndex: 2,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
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
        polarIndex: 0,
        itemStyle: {
          color: "#04afa4",
        },
        z: 1,
        coordinateSystem: "polar",
        barWidth: "15",
        data: angleResult,
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
          <AngleIcon style={{ fontSize: "16px", color: "#000" }} />
          <h3>
            {angle_description[props.title as keyof typeof angle_description]}
          </h3>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: "500px" }} />
      {props.avgRange[1] != 0 ? (
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <DashOutlined style={{ color: "#fb5f4c" }} />
          <p style={{ margin: 0 }}>
            the average value of{" "}
            {
              angle_description[
                props.title as keyof typeof angle_description
              ].split("(")[1][0]
            }{" "}
            in A-RNA:
          </p>
          <b>
            {`${-props.avgRange[1]}\u00B0 \u00B1 ${
              props.avgRange[2] - props.avgRange[1]
            }\u00B0`}
          </b>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default HistogramAngles;
