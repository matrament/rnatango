"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../echarts/ReactECharts";
import { ReactEChartsProps } from "../echarts/ReactECharts";

const ChiBarStats = (props: { angle: any[] }) => {
  const [syn, setSyn] = useState<number>(0);
  const [anti, setAnti] = useState<number>(0);

  useEffect(() => {
    let x: number[] = props.angle.filter((e) => {
      return e != null;
    });
    let count = x.filter((e) => e < 120 && e > -30).length;
    setSyn(count);
    setAnti(x.length - count);
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
        return `${params.name}: ${params.data.value} ${
          params.data.value === 1 ? "angle" : "angles"
        }`;
      },
    },

    xAxis: {
      type: "category",
      data: ["Syn (-30\u00B0 < chi < 120\u00B0)", "Anti"],
    },
    yAxis: {
      type: "value",
    },

    series: [
      {
        data: [
          {
            value: syn,
            itemStyle: {
              color: "#04afa4",
            },
          },
          {
            value: anti,
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

export default ChiBarStats;
