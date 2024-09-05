"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import { second_scenario_result_dataset_single_model } from "@/types/modelsType";
import { Divider, Row } from "antd";
import angles_description from "../../../json/angles_description.json";
import { angles_result } from "../../../types/modelsType";

type ObjectKey = keyof second_scenario_result_dataset_single_model;

const StackedLinePlot = (props: {
  dataset: second_scenario_result_dataset_single_model[];
  requestedAngles: string[];
}) => {
  const [dataset, setDataset] = useState<any>([]);
  useEffect(() => {
    let temp: any = [];

    props.requestedAngles.map((angle, index) => {
      temp.push({
        name: `${angle.toLowerCase()}`,
        type: "line",
        // colorBy: "series",
        data: props.dataset.map((el) => {
          return el[`${angle.toLowerCase()}` as ObjectKey];
        }),
      });
    });
    setDataset(temp);
  }, [props.dataset]);

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      trigger: "axis",
      // formatter: (params) => {
      //   return params[0].name;
      // },
    },
    legend: {
      data: props.requestedAngles.map((e) => {
        return e.toLowerCase();
      }),
      formatter: function (name) {
        return `${angles_description[name as keyof angles_result]}`;
      },
      width: "70%",
      selected: {
        mcq: true,
        alpha: false,
        beta: false,
        gamma: false,
        delta: false,
        epsilon: false,
        zeta: false,
        eta: false,
        theta: false,
        eta_prim: false,
        theta_prim: false,
        chi: false,
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    toolbox: {
      itemSize: 30.5,

      feature: {
        saveAsImage: {
          excludeComponents: ["dataZoom", "toolbox"],
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
    },
    xAxis: {
      type: "category",
      data: props.dataset.map((e) => {
        return e.name;
      }),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}°",
      },
    },
    dataZoom: [
      {
        start: 0,
        end: 100,
        dataBackground: {
          areaStyle: { color: "#fafafa" },
        },
        selectedDataBackground: {
          areaStyle: {
            color: "#cccccc",
            opacity: 1,
          },
          lineStyle: {
            color: "#cccccc",
          },
        },
        fillerColor: "rgba(196, 196, 196, 0.3)",
        borderColor: "#dcdcdc",
        brushStyle: {
          color: "rgba(4, 175, 164, 0.3)",
        },
        moveHandleStyle: {
          color: "#04afa4",
          borderColor: "#cccccc",
        },
        emphasis: {
          moveHandleStyle: {
            color: "#04afa4",
          },
        },
      },
    ],
    series: dataset,
    color: [
      "#dfb2f4",
      "#94de8b",
      "#61f4de",
      "#a0c4ff ",
      "#ffc6ff",
      "#70d6ff",
      "#ff70a6",
      "#ff9770",
      "#ffd670",
      "#68b6ef",
      "#55d6c2",
      "#f08080",
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>
        Residue-wise angle values
      </h2>
      <p style={{ textAlign: "center", marginTop: "0" }}>
        (click angle name to show/hide line plot)
      </p>
      {dataset.length != 0 ? (
        <ReactECharts
          option={option}
          style={{ height: "70dvh", marginLeft: "30px", marginRight: "30px" }}
        />
      ) : null}
      <Row style={{ width: "100%" }} justify={"center"}>
        <p style={{ margin: 0, fontSize: "13px", color: "#6e7079" }}>
          This slider is used for zooming a specific area.
        </p>
      </Row>
      <Divider />
    </div>
  );
};
export default StackedLinePlot;
