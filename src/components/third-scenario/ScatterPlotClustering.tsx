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
      feature: {
        saveAsImage: {
          // excludeComponents: ["visualMap", "toolbox", "dataZoom"],
          name: `clustering_models`,
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
      <h2 style={{ marginTop: 0 }}>Clustering</h2>
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
