"use client";
import ModelsNucleotyde from "@/components/second-scenario/output/ModelsNucleotyde";
import styles from "./page.module.css";
import ModelsRangeAngle from "@/components/second-scenario/output/ModelsRangeAngle";
import { resultSecondScenario } from "@/types/modelsType";
import { useEffect, useState } from "react";

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
];

const resultSecondScenario = () => {
  const [models, setModels] = useState<string[]>([]);
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
  }, []);

  return (
    <>
      <div className={styles.scenario}>
        <p>Upload max 5 models for analyse:</p>
        <p>table modele kolumny</p>
        <p>table </p>
        <ModelsNucleotyde />
        <ModelsRangeAngle />
      </div>
    </>
  );
};
export default resultSecondScenario;
