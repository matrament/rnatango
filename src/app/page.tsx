"use client";
import styles from "./page.module.css";
import ThirdScenarioUpload from "../components/third-scenario/ThirdScenarioUpload";
import LoadData from "../components/first-scenario/LoadData";
import scenarios from "../json/scenarios.json";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [seedState, setSeedState] = useState(1);
  const searchParams = useSearchParams();
  const selectedScenario = searchParams.get("scenario") || "1";
  const scenariosVariants: { [key: string]: string } = {
    "1": "Single model",
    "2": "Model(s) vs Target",
    "3": "Model vs Model",
  };
  return (
    <>
      <p style={{ textAlign: "justify", margin: "15px" }}>
        Welcome to <b>RNAtango</b>, a web server to study 3D RNA structures
        through torsion angles. Depending on the selected scenario, users can
        explore the distribution of torsion angles in a single RNA structure or
        its fragment, compare the RNA model(s) with the native structure, or
        perform a comparative analysis in a set of models. The comparison
        procedure applies MCQ and LCS-TA metrics to assess RNA angular
        similarity. <b>Select a scenario to start...</b>
      </p>
      <div className={styles.scenario}>
        <div className={styles.buttond}>
          {Object.keys(scenariosVariants).map(
            (version: string, index: number) => (
              <div
                key={index}
                className={`${styles.buttonscenario} ${
                  selectedScenario === version
                    ? styles.active
                    : styles.nonactive
                }`}
                onClick={() => {
                  router.push(`/?scenario=${version}`);
                  setSeedState((prevCount: number) => prevCount + 1);
                }}
              >
                {scenariosVariants[version]}
              </div>
            )
          )}
        </div>
      </div>
      {selectedScenario === "1" ? <LoadData key={seedState} /> : null}
      {selectedScenario === "2" ? <LoadData key={seedState} /> : null}
      {selectedScenario === "3" ? (
        <ThirdScenarioUpload key={seedState} />
      ) : null}
    </>
  );
};

const HomePage = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default HomePage;
