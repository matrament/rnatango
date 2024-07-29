"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import styles from "../../first-scenario/first-scenario.module.css";
import { DotChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Divider, Space, Switch } from "antd";
import { useMediaQuery } from "react-responsive";

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

    // props.dataset.map((residue, index) => {
    //   xAxis.push(residue["dotbracket"] as string);
    //   for (let i = 0; i < props.models.length; i++) {
    //     temp_discrete.push([index, i, residue[`${props.models[i]}`] as number]);
    //     temp_continous.push([
    //       index,
    //       i,
    //       Math.log(residue[`${props.models[i]}`] as number),
    //     ]);
    //   }
    // });
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
    },
    toolbox: {
      feature: {
        saveAsImage: {
          excludeComponents: ["visualMap", "toolbox", "dataZoom"],
          name: `heatmap_residue_wise_MCQ`,
        },
      },
    },
    xAxis: [
      {
        type: "category",
        data: residue,
        splitArea: {
          show: true,
        },
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
      splitArea: {
        show: true,
      },
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
        labelFormatter: function (value) {
          return `${value + firstIndex}`;
        },
        textStyle: {
          fontWeight: "bold",
        },
        // handleLabelShow: false,
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
      <Switch
        style={{ marginLeft: "30px" }}
        checkedChildren={<LineChartOutlined />}
        unCheckedChildren={<DotChartOutlined />}
        defaultChecked
        onChange={(checked: boolean) => setContinous(checked)}
      />
      <ReactECharts
        option={option}
        style={{ height: "40dvh", marginLeft: "30px", marginRight: "30px" }}
      />
      <Divider />
    </div>
  );
};

export default HeatMap;
