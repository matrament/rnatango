"use client";
import { useEffect, useState } from "react";
import { ReactECharts } from "../../components/echarts/ReactECharts";
import { ReactEChartsProps } from "../../components/echarts/ReactECharts";

const example = {
  numberClusters: 2,
  models: [
    {
      x: 126.20813235915996,
      y: 47.17293264396919,
      name: "18_RNAComposer_5_rpr.pdb",
      clusterNumber: 2,
    },
    {
      x: 0,
      y: 285.9985556070871,
      name: "18_YagoubAli_1.pdb",
      clusterNumber: 1,
    },
    {
      x: 192.27708550068854,
      y: 145.49461516891915,
      name: "18_Lee_1.pdb",
      clusterNumber: 2,
    },
    {
      x: 293.28940440242235,
      y: 320,
      name: "18_Dokholyan_1.pdb",
      clusterNumber: 2,
    },
    {
      x: 8.231137541894185,
      y: 17.895699479229364,
      name: "18_Das_1.pdb",
      clusterNumber: 1,
    },
    {
      x: 320,
      y: 0,
      name: "18_Chen_1.pdb",
      clusterNumber: 2,
    },
  ],
};
const ScatterPlotClustering = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    let temp: any[] = [];
    for (let i = 0; i < example.numberClusters; i++) {
      temp.push({
        symbolSize: 15,
        type: "scatter",
        data: [],
        label: {
          show: true,
          position: "bottom",
          align: "center",
          verticalAlign: "top",
          distance: 10,
          formatter: function (d: any) {
            return d.data[2];
          },
        },

        fontSize: 16,
      });
    }
    example.models.map((model) =>
      temp[model.clusterNumber - 1].data.push([model.x, model.y, model.name])
    );
    setData(temp);
  }, []);

  const option: ReactEChartsProps["option"] = {
    toolbox: {
      feature: {
        saveAsImage: {
          // excludeComponents: ["visualMap", "toolbox", "dataZoom"],
          name: `clustering_models`,
        },
      },
    },
    xAxis: {},
    yAxis: {},
    series: data,
  };

  return (
    <div style={{ width: "100%" }}>
      <ReactECharts
        option={option}
        style={{ height: "60dvh", marginLeft: "30px", marginRight: "30px" }}
      />
    </div>
  );
};

export default ScatterPlotClustering;
