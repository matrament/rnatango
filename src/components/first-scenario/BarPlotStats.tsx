"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";

const BarPlotStats = (props: { angle: any[]; type: string }) => {
  const [syn, setSyn] = useState<number>(0);
  const [anti, setAnti] = useState<number>(0);
  const [endo, setEndo] = useState<number>(0);
  const [exo, setExo] = useState<number>(0);

  useEffect(() => {
    let x: number[] = props.angle.filter((e) => {
      return e != null;
    });
    if (props.type == "chi") {
      let count = x.filter((e) => e < 120 && e > -30).length;
      setSyn(count);
      setAnti(x.length - count);
    } else {
      let count = x.filter((e) => Math.floor((e + 180) / 36) % 2 == 0).length;
      setExo(x.length - count);
      setEndo(count);
    }
  }, [props.angle]);

  const option: ReactEChartsProps["option"] = {
    legend: {
      show: true,
      // top: "bottom",
      bottom: "0%",
      itemWidth: 30,
      itemHeight: 15,
      orient: "horizontal",
      align: "auto",
      textStyle: {
        fontSize: 14,
      },
      selectedMode: false,
      borderRadius: 15,
    },

    toolbox: {
      itemSize: 30.5,
      show: true,
      top: "15",
      feature: {
        saveAsImage: {
          name: `syn_anti_statistics`,
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
        return `${params.name}: ${params.data.value} ${
          params.data.value === 1 ? "angle" : "angles"
        }`;
      },
    },

    xAxis: {
      type: "category",
      data:
        props.type == "chi"
          ? ["Syn (-30\u00B0 < chi < 120\u00B0)", "Anti"]
          : ["endo", "exo"],
    },
    yAxis: {
      type: "value",
    },

    series: [
      {
        data: [
          {
            value: props.type == "chi" ? syn : exo,
            itemStyle: {
              color: "#04afa4",
            },
          },
          {
            value: props.type == "chi" ? anti : endo,
            itemStyle: {
              color: "#fb5f4c",
            },
          },
        ],
        type: "bar",
        label: {
          show: true,
          fontWeight: "bold",
          textBorderWidth: 3.5,

          offset: [0, -10],
        },
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
        <ReactECharts option={option} style={{ height: "500px" }} />
      </div>
    </div>
  );
};

export default BarPlotStats;
