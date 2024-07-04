"use client";
import { useState, useEffect } from "react";
import { ReactECharts } from "../../echarts/ReactECharts";
import { ReactEChartsProps } from "../../echarts/ReactECharts";
import styles from "../../first-scenario/first-scenario.module.css";

const example: { [key: string]: any }[] = [
  {
    name: "A.G1",
    zeta: 24.76,
    eta: 31.82,
    chi: 23.03,
    mcq: 36.2,
  },
  {
    name: "A.C2",
    zeta: 17.15,
    eta: 4.75,
    chi: 9.63,
    mcq: 22.77,
  },
  {
    name: "A.G3",
    zeta: 3.71,
    eta: 4.05,
    chi: 6.7,
    mcq: 8.86,
  },
  {
    name: "A.G4",
    zeta: 3.88,
    eta: 1.25,
    chi: 6.12,
    mcq: 3.62,
  },
  {
    name: "A.A5",
    zeta: 15.43,
    eta: 2.12,
    chi: 11.98,
    mcq: 5.08,
  },
  {
    name: "A.U6",
    zeta: 1.09,
    eta: 1.52,
    chi: 5.32,
    mcq: 6.75,
  },
  {
    name: "A.U7",
    zeta: 3.43,
    eta: 1.43,
    chi: 1.94,
    mcq: 3.94,
  },
  {
    name: "A.U8",
    zeta: 5.79,
    eta: 2.51,
    chi: 2.15,
    mcq: 4.43,
  },
  {
    name: "A.A9",
    zeta: 3.61,
    eta: 1.99,
    chi: 5.94,
    mcq: 5.16,
  },
  {
    name: "A.G10",
    zeta: 12.47,
    eta: 2.55,
    chi: 5.4,
    mcq: 5.4,
  },
  {
    name: "A.C11",
    zeta: 12.47,
    eta: 3.16,
    chi: 4.21,
    mcq: 6.46,
  },
  {
    name: "A.U12",
    zeta: 1.3,
    eta: 2.36,
    chi: 2.91,
    mcq: 2.9,
  },
  {
    name: "A.C13",
    zeta: 8.22,
    eta: 1.08,
    chi: 10.21,
    mcq: 12.44,
  },
  {
    name: "A.A14",
    zeta: 8.16,
    eta: 0.22,
    chi: 8.31,
    mcq: 16.68,
  },
  {
    name: "A.G15",
    zeta: 16.72,
    eta: 11.65,
    chi: 11.98,
    mcq: 5.47,
  },
  {
    name: "A.U16",
    zeta: 39.95,
    eta: 50.85,
    chi: 34.02,
    mcq: 78.5,
  },
  {
    name: "A.U17",
    zeta: 155.47,
    eta: 16.5,
    chi: 39.02,
    mcq: 96.32,
  },
  {
    name: "A.G18",
    zeta: 0.4,
    eta: 17.89,
    chi: 3.99,
    mcq: 39.55,
  },
  {
    name: "A.G19",
    zeta: 0.63,
    eta: 3.82,
    chi: 0.62,
    mcq: 3.22,
  },
  {
    name: "A.G20",
    zeta: 13.18,
    eta: 4.5,
    chi: 1.42,
    mcq: 8.24,
  },
];
const columns = ["zeta", "eta", "chi", "mcq"];

const StackedLinePlot = () => {
  const [dataset, setDataset] = useState<any>([]);
  useEffect(() => {
    let dataTemp: { name: any; type: any; data: any[] }[] = columns.map(
      (column) => {
        let temp: { name: string; type: string; data: number[] } = {
          name: column,
          type: "line",
          data: [],
        };
        for (let i = 0; i < example.length; i++) {
          temp.data.push(example[i][column]);
        }
        return temp;
      }
    );
    setDataset(dataTemp);
  }, []);
  const option: ReactEChartsProps["option"] = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: columns,
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "15%",
      // containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          excludeComponents: ["dataZoom", "toolbox"],
        },
      },
    },
    xAxis: {
      type: "category",
      //   boundaryGap: false,
      data: example.map((e) => {
        return e.name;
      }),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} °",
        // customValues: [0, 4, 7, 8, 3000],
      },
    },
    dataZoom: [
      //   {
      //     type: "inside",
      //     start: 0,
      //     end: 10,
      //   },
      {
        start: 0,
        end: 100,
      },
    ],
    series: dataset,
  };

  return (
    <div style={{ width: "100%" }}>
      {dataset.length != 0 ? (
        <ReactECharts
          option={option}
          style={{ height: "50dvh", marginLeft: "30px", marginRight: "30px" }}
        />
      ) : null}
    </div>
  );
};
export default StackedLinePlot;
