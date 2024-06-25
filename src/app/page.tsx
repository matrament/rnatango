"use client";
import { useState } from "react";
import styles from "./page.module.css";
import SecondScenarioUpload from "../components/second-scenario/SecondScenario";
import ThirdScenarioUpload from "../components/third-scenario/ThirdScenarioUpload";
import RequestForm from "../components/first-scenario/LoadData";

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
      {chooseScenario === 1 ? <RequestForm /> : null}
      {chooseScenario === 2 ? <SecondScenarioUpload /> : null}
      {chooseScenario === 3 ? <ThirdScenarioUpload /> : null}
    </>
  );
};

export default Home;
