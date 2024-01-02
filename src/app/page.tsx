"use client";
import styles from "./page.module.css";
import FirstScenarioUpload from "@/components/first-scenario/FirstScenarioUpload";
import SecondScenarioUpload from "@/components/second-scenario/SecondScenario";
import ThirdScenarioUpload from "@/components/third-scenario/ThirdScenarioUpload";
import FirstScenarioProperties from "@/components/first-scenario/FirstScenarioProperties";
import { useState } from "react";
import ResultFile from "../components/first-scenario/ResultFile";

const ScenarioButton = (props: {
  title: string;
  onClick: any;
  conditionalcss: any;
}) => {
  return (
    <button
      className={`${styles.buttonscenario} ${props.conditionalcss}`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

const Home = () => {
  const [chooseScenario, setChooseScenario] = useState(1);
  const buttons = ["Single model", "Model(s) vs Target", "Model vs Model"];
  return (
    <>
      <div className={styles.scenario}>
        <p style={{ textAlign: "left", paddingLeft: "20px" }}>
          Choose one scenario:
        </p>
        <div className={styles.buttond}>
          {buttons.map((button: string, index: number) => (
            <ScenarioButton
              key={index}
              title={button}
              onClick={() => setChooseScenario(index + 1)}
              conditionalcss={
                chooseScenario == index + 1 ? styles.active : styles.nonactive
              }
            />
          ))}
        </div>
      </div>
      {chooseScenario === 1 ? <FirstScenarioUpload /> : null}
      {chooseScenario === 2 ? <SecondScenarioUpload /> : null}
      {chooseScenario === 3 ? <ThirdScenarioUpload /> : null}

      <FirstScenarioProperties />
      <ResultFile />
    </>
  );
};

export default Home;
