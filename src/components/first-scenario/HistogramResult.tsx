"use client";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

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

const HistogramResult = (props: { angle: any[] }) => {
  const [angleResult, setAngleResult] = useState<{ [key: number]: number }>({});
  useEffect(() => {
    let x = props.angle.filter((e) => {
      return e != null;
    });
    x = x.map((e) => (e == null ? null : Math.floor((e + 180) / 15)));
    let counts: any = {};
    for (let i = 0; i < 24; i++) {
      counts[i] = 0;
    }
    x.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    setAngleResult(counts);
  }, [props.angle]);

  const data = {
    labels: Object.values(chartDataRange),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(angleResult),
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h3>Angle: alpha</h3>
      <ul>
        {props.angle.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <PolarArea data={data} />
    </>
  );
};

export default HistogramResult;
