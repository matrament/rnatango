"use client";
import { useState } from "react";
import styles from "./page.module.css";
import ThirdScenarioUpload from "../components/third-scenario/ThirdScenarioUpload";
import LoadData from "../components/first-scenario/LoadData";
import scenarios from "../json/scenarios.json";

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
      <p style={{ textAlign: "center", marginBottom: "10px" }}>
        Select a scenario
      </p>
      <div className={styles.scenario}>
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
      {chooseScenario === 1 ? (
        <LoadData scenario={scenarios.firstScenario} />
      ) : null}
      {chooseScenario === 2 ? (
        <LoadData scenario={scenarios.secondScenario} />
      ) : null}
      {chooseScenario === 3 ? <ThirdScenarioUpload /> : null}
    </>
  );
};

export default Home;
