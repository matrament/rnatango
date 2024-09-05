"use client";
import { useEffect, useState } from "react";
import { ReactECharts } from "../../components/echarts/ReactECharts";
import { ReactEChartsProps } from "../../components/echarts/ReactECharts";
import { Divider, Select } from "antd";
import { getClustering } from "@/utils/getClustering";
import { clustering } from "../../types/modelsType";

const ScatterPlotClustering = (props: {
  taskId: string | null;
  models: string[];
}) => {
  const [result, setResult] = useState<clustering[]>([]);
  const [data, setData] = useState<{ [key: number]: any[] }>({
    2: [
      {
        symbolSize: 15,
        type: "scatter",
        data: [],
      },
    ],
  });
  const [options, setOptions] = useState<string[]>([]);
  const [selection, setSelection] = useState<number>(2);

  useEffect(() => {
    getClustering(props.taskId, setResult);
  }, []);

  useEffect(() => {
    if (result.length != 0) {
      let tempData: { [key: number]: any[] } = {};
      result.map((cluster) => {
        let temp: any[] = [];
        for (let i = 0; i < props.models.length; i++) {
          temp.push({
            symbolSize: 15,
            type: "scatter",
            data: [],

            animation: false,
            label: {
              show: true,
              position: "bottom",
              align: "center",
              verticalAlign: "top",
              distance: 10,
              formatter: function (d: any) {
                return d.data[2];
              },
              // fontWeight: "bold",
              fontSize: 14,
            },
          });
        }
        cluster.models.map((model) =>
          temp[model.clusterNumber as number].data.push([
            model.x,
            model.y,
            model.name,
          ])
        );
        tempData[cluster.numberClusters] = temp;
      });
      setData(tempData);
      setOptions(Object.keys(tempData));
    }
  }, [result]);

  const option: ReactEChartsProps["option"] = {
    toolbox: {
      itemSize: 30.5,
      feature: {
        saveAsImage: {
          // excludeComponents: ["visualMap", "toolbox", "dataZoom"],
          name: `clustering_models`,
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
    grid: {
      show: true,
    },
    xAxis: { axisLabel: { show: false } },
    yAxis: {
      axisLabel: { show: false },
    },
    series: data[selection],
    color: [
      "#f08080",
      "#55d6c2",
      "#dfb2f4",
      "#94de8b",
      "#ffd670",
      "#61f4de",
      "#a0c4ff ",
      "#ffc6ff",
      "#70d6ff",
      "#ff70a6",
      "#ff9770",
      "#68b6ef",
    ],
  };

  const handleChange = (value: string) => {
    setSelection(Number(value));
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Clustering (based on global MCQ)</h2>
      <Select
        style={{ width: "200px" }}
        defaultValue="2"
        options={options.map((e) => ({
          value: e,
          label: `number of clusters ${e}`,
        }))}
        onChange={handleChange}
      />
      <div
        style={{
          width: "100%",
        }}
      >
        <ReactECharts
          option={option}
          style={{ height: "60dvh", marginLeft: "30px", marginRight: "30px" }}
        />
      </div>
      <Divider />
    </div>
  );
};

export default ScatterPlotClustering;
