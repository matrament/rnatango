"use client";
import ModelsNucleotyde from "@/components/second-scenario/output/ModelsNucleotyde";
import styles from "./page.module.css";
import ModelsRangeAngle from "@/components/second-scenario/output/ModelsRangeAngle";
import { resultSecondScenario } from "@/types/modelsType";
import { useEffect, useState } from "react";
import StackedLinePlot from "@/components/second-scenario/output/StackedLinePlot";
import ModelvsTarget from "@/components/second-scenario/output/ModelvsTarget";
import { Divider } from "antd";
import data from "../../json/example.json";
import HeatMap from "@/components/second-scenario/output/HeatMap";

const example: resultSecondScenario[] = [
  {
    name: "A.C1",
    key: 0,
    models: {
      ["AT"]: {
        alpha: 2,
        beta: 3,
        gamma: 4,
        delta: null,
        epsilon: null,
        zeta: null,
        eta: null,
        theta: null,
        eta_prim: null,
        theta_prim: null,
        chi: null,
        mcq: 65,
      },
      ["BT"]: {
        alpha: 5,
        beta: 6,
        gamma: 7,
        delta: null,
        epsilon: null,
        zeta: null,
        eta: null,
        theta: null,
        eta_prim: null,
        theta_prim: null,
        chi: null,
        mcq: 25,
      },
    },
  },
  {
    name: "A.G2",
    key: 1,
    models: {
      ["AT"]: {
        alpha: 2,
        beta: 3,
        gamma: 4,
        delta: null,
        epsilon: null,
        zeta: 4,
        eta: 5,
        theta: null,
        eta_prim: 65,
        theta_prim: 5,
        chi: null,
        mcq: 13,
      },
      ["BT"]: {
        alpha: 5,
        beta: 6,
        gamma: 7,
        delta: null,
        epsilon: null,
        zeta: null,
        eta: null,
        theta: null,
        eta_prim: null,
        theta_prim: null,
        chi: null,
        mcq: 23,
      },
    },
  },
  {
    name: "A.G3",
    key: 2,
    models: {
      ["AT"]: {
        alpha: 2,
        beta: 3,
        gamma: 4,
        delta: null,
        epsilon: null,
        zeta: 4,
        eta: 5,
        theta: null,
        eta_prim: 65,
        theta_prim: 5,
        chi: null,
        mcq: 13,
      },
      ["BT"]: {
        alpha: 5,
        beta: 6,
        gamma: 7,
        delta: null,
        epsilon: null,
        zeta: null,
        eta: null,
        theta: null,
        eta_prim: null,
        theta_prim: null,
        chi: null,
        mcq: 23,
      },
    },
  },
];

const resultSecondScenario = () => {
  const [models, setModels] = useState<string[]>([]);
  const [modelsComparsion, setModelsComparsion] = useState<any>([]);
  useEffect(() => {
    const nowaLista = example.map((e) => {
      const newItem: { [key: string]: string | number } = {
        ["name"]: e.name,
        ["key"]: e.key,
      };

      for (const model in e.models) {
        if (e.models[model].mcq !== undefined) {
          newItem[model] = e.models[model].mcq;
        }
      }

      return newItem;
    });
    console.log(nowaLista);
    // FIXME: potem podmienic
    // setModels(Object.keys(example[0].models));
    // setModelsComparsion(nowaLista);
    setModels(["4TNA.A_A.1-76", "1EW.A_A.1-76"]);
    setModelsComparsion(data);
  }, []);

  return (
    <>
      <div className={styles.scenario}>
        {models.length != 0 ? (
          <>
            <h2>Table....</h2>
            <ModelsNucleotyde dataset={modelsComparsion} models={models} />
            <Divider />
            <h2>Table....</h2>

            <ModelsRangeAngle dataset={modelsComparsion} models={models} />
          </>
        ) : null}
        <Divider />
        <HeatMap dataset={modelsComparsion} models={models} />
        <Divider />
        <ModelvsTarget dataset={modelsComparsion} models={models} />
        <Divider />
        <StackedLinePlot />
        <Divider />
        <h1>LCS-ta</h1>
      </div>
    </>
  );
};
export default resultSecondScenario;
