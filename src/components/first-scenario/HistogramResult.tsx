"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

const chartDataRange = {
  0: "[-180,-165)",
  1: "[-165:-150)",
  2: "[-150:-135)",
  3: "[-135:-120)",
  4: "[-120:-105)",
  5: "[-105:-90)",
  6: "[-90:-75)",
  7: "[-75:-60)",
  8: "[-60:-45)",
  9: "[-45:-30)",
  10: "[-30:-15)",
  11: "[-15:0)",
  12: "[0:15)",
  13: "[15:30)",
  14: "[30:45)",
  15: "[45:60)",
  16: "[60:75)",
  17: "[75:90)",
  18: "[90:105)",
  19: "[105:120)",
  20: "[120:135)",
  21: "[135:150)",
  22: "[150:165)",
  23: "[165:180)",
};

const HistogramResult = (props: { angle: any[]; title: string }) => {
  const [angleResult, setAngleResult] = useState<{ [key: number]: number }>({});
  const [testResult, setTestResult] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    let x = props.angle.filter((e) => {
      return e != null;
    });
    x = x.map((e) => (e == null ? null : Math.floor((e + 180) / 15)));
    let counts: { [key: number]: number } = {};
    for (let i = 0; i < 24; i++) {
      counts[i] = 0;
    }
    // for (let i = 0, j = -172.5; i < 24; i++) {
    //   counts[j] = 0;
    //   j = j + 15;
    // }
    x.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    setAngleResult(counts);
    setTestResult(Object.values(counts).map((e) => Math.sqrt(e)));
    console.log(counts);
    console.log(Object.values(counts).map((e) => Math.sqrt(e)));
  }, [props.angle]);

  const data = {
    labels: Object.values(chartDataRange),
    datasets: [
      {
        label: "angles",
        data: Object.values(testResult),
        backgroundColor: ["#04AFA4"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.histogram}>
      <div className={styles.histogramtitle}>
        <h3>{props.title}</h3>
      </div>
      <PolarArea data={data} />
    </div>
  );
};
export default HistogramResult;
