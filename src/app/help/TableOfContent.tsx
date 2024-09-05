"use client";
import styles from "./page.module.css";

const TableOfContent = () => {
  let moveTo = (id: string) => {
    document.getElementById(id)!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <h4 style={{ marginLeft: 0 }}>Table of contents</h4>

      <ol className={styles.orderedList}>
        <li>
          <a
            style={{ cursor: "pointer", color: "#04afa4" }}
            onClick={() => moveTo("home_paragraph")}
          >
            Homepage and input data
          </a>
          <ol className={styles.nestedList}>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("single_model")}
              >
                Single model
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("models_vs_target")}
              >
                Model(s) vs Target
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("model_vs_model")}
              >
                Model vs Model
              </a>
            </li>
          </ol>
        </li>
        <li>
          <a
            style={{ cursor: "pointer", color: "#04afa4" }}
            onClick={() => moveTo("angular_measures")}
          >
            Angular measures in RNAtango
          </a>
          <ol className={styles.nestedList}>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("torsion_angles")}
              >
                Torsion and pseudotorsion angles
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("mcq")}
              >
                MCQ
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("lcs_ta")}
              >
                LCS-TA
              </a>
            </li>
          </ol>
        </li>
        <li>
          <a
            style={{ cursor: "pointer", color: "#04afa4" }}
            onClick={() => moveTo("result_of_data_processing")}
          >
            Results of data processing
          </a>
          <ol className={styles.nestedList}>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("single_model_result")}
              >
                Single model
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("models_vs_target_result")}
              >
                Model(s) vs Target
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: "#04afa4" }}
                onClick={() => moveTo("model_vs_model_result")}
              >
                Model vs Model
              </a>
            </li>
          </ol>
        </li>
        <li>
          <a
            style={{ cursor: "pointer", color: "#04afa4" }}
            onClick={() => moveTo("system_requirements")}
          >
            System requirements
          </a>
        </li>
      </ol>
    </div>
  );
};

export default TableOfContent;
