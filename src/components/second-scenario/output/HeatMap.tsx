"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import styles from "../../first-scenario/first-scenario.module.css";
import { DotChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Divider, Row, Space, Switch, Tooltip } from "antd";
import { useMediaQuery } from "react-responsive";
import Download from "../../../assets/download.svg";

type datasetModels = {
  [key: string]: string | number;
};

const HeatMap = (props: { dataset: datasetModels[]; models: string[] }) => {
  const [datasetDiscrete, setDatasetDiscrete] = useState<number[][]>([]);
  const [datasetContinous, setDatasetContinous] = useState<number[][]>([]);
  const [residue, setResidue] = useState<string[]>([]);
  const [continous, setContinous] = useState<boolean>(true);
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
  const [firstIndex, setFirstIndex] = useState<number>(0);

  useEffect(() => {
    let temp_continous: number[][] = [];
    let temp_discrete: number[][] = [];
    let xAxis: string[] = [];
    const temp = String(props.dataset[0].name);
    const parts = parseInt(temp.split(".")[1].substring(1), 10);
    setFirstIndex(parts);

    let models_reverse = props.models.reverse();

    props.dataset.map((residue, index) => {
      xAxis.push(residue["dotbracket"] as string);
      models_reverse.map((model, i) => {
        temp_discrete.push([index, i, residue[`${model}`] as number]);
        temp_continous.push([
          index,
          i,
          Math.log(residue[`${model}`] as number),
        ]);
      });
    });

    setDatasetDiscrete(temp_discrete);
    setDatasetContinous(temp_continous);
    setResidue(xAxis);
  }, [props.dataset, props.models]);

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      position: "top",
      trigger: "axis",
      // valueFormatter: (value: any) =>
      //   `${continous ? Math.round(Math.E ** value) : Number(value.toFixed(2))}`,
      axisPointer: {
        lineStyle: {
          color: "#b93636",
          width: 1,
        },
      },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      formatter: function (params: any) {
        return (
          "MCQ values:" +
          "<br/>" +
          `<ul>` +
          params
            .map((param: any, index: number) => {
              let value = continous
                ? Number((Math.E ** param.data[2]).toFixed(2))
                : param.data[2];
              return `<li>${props.models[index]} : <b>${value}\u00B0</b></li>`;
            })
            .reverse()
            .join("") +
          `</ul>`
        );
      },
    },
    grid: {
      // left: "15%",
      // right: "left",
      // height: `${props.models.length * 10}%`,
      bottom: 85,
      backgroundColor: "#bfbfbf",
      show: true,
    },
    toolbox: {
      itemSize: 30.5,
      feature: {
        saveAsImage: {
          excludeComponents: ["visualMap", "toolbox", "dataZoom"],
          name: `heatmap_residue_wise_MCQ`,
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
    xAxis: [
      {
        type: "category",
        data: residue,
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
        xAxisIndex: [0, 1],
        // right: 10,
        start: 0,
        end: 100,
        top: "top",
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
        labelFormatter: function (value) {
          return `${value + firstIndex}`;
        },
        textStyle: {
          fontWeight: "bold",
        },
      },
      {
        type: "inside",
        xAxisIndex: [0, 1],
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

        splitNumber: 4,
        pieces: [
          { min: 60, label: "> 60\u00B0", color: "#e31919" },
          { min: 30, max: 60, label: "30\u00B0 - 60\u00B0", color: "#fd8c3a" },
          { min: 15, max: 30, label: "15\u00B0 - 30\u00B0", color: "#fccc5c" },
          { max: 15, label: "0\u00B0 - 15\u00B0", color: "#ffffb0" },
        ],
        inRange: {
          color: [
            "#ffffb0",
            "#ffffb0",
            "#ffffb0",
            "#ffffb0",
            "#ffffb0",
            "#ffffb0",
            "#FFF39B",
            "#FEE686",
            "#fccc5c",
            "#FDAC4B",
            "#fd8c3a",
            "#F0532A",
            "#EA3622",
            "#e31919",
            "#e31919",
          ],
        },
        itemHeight: continous ? 180 : 30,
        formatter: function (value: any) {
          return `${
            continous ? `${Math.round(Math.E ** value)}\u00B0` : value
          }`;
        },
      },
    ],
    series: [
      {
        name: "MCQ value(s)",
        type: "heatmap",
        data: continous ? datasetContinous : datasetDiscrete,
        tooltip: {
          formatter: "{b0}: {c0}<br />{b1}: {c1}",
        },
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
      <h2 style={{ textAlign: "center", marginTop: "0" }}>
        Residue-wise MCQ values for each model (heatmap)
      </h2>
      <Tooltip
        title={
          <p style={{ margin: 0, textAlign: "center" }}>
            Click to switch between heatmap colorings
          </p>
        }
      >
        <Switch
          style={{ marginLeft: "30px" }}
          checkedChildren={<LineChartOutlined />}
          unCheckedChildren={<DotChartOutlined />}
          defaultChecked
          onChange={(checked: boolean) => setContinous(checked)}
        />
      </Tooltip>
      <Row style={{ width: "100%" }} justify={"center"}>
        <p style={{ margin: 0, fontSize: "13px", color: "#6e7079" }}>
          This slider is used for zooming a specific area.
        </p>
      </Row>
      <ReactECharts
        option={option}
        style={{ height: "40dvh", marginLeft: "30px", marginRight: "30px" }}
      />
      <Divider />
    </div>
  );
};

export default HeatMap;
