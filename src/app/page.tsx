"use client";
import styles from "./page.module.css";
import ThirdScenarioUpload from "../components/third-scenario/ThirdScenarioUpload";
import LoadData from "../components/first-scenario/LoadData";
import scenarios from "../json/scenarios.json";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Home = () => {
  const searchParams = useSearchParams();
  const selectedScenario = searchParams.get("scenario");
  const scenariosVariants: { [key: string]: string } = {
    "1": "Single model",
    "2": "Model(s) vs Target",
    "3": "Model vs Model",
  };
  return (
    <>
      <p style={{ textAlign: "center", marginBottom: "10px" }}>
        Select a scenario
      </p>
      <div className={styles.scenario}>
        <div className={styles.buttond}>
          {Object.keys(scenariosVariants).map(
            (version: string, index: number) => (
              <Link
                key={index}
                href={`?scenario=${version}`}
                className={`${styles.buttonscenario} ${
                  selectedScenario === version
                    ? styles.active
                    : styles.nonactive
                }`}
              >
                {scenariosVariants[version]}
              </Link>
            )
          )}
        </div>
      </div>
      {selectedScenario === "1" ? <LoadData /> : null}
      {selectedScenario === "2" ? <LoadData /> : null}
      {selectedScenario === "3" ? <ThirdScenarioUpload /> : null}
    </>
  );
};

export default Home;
