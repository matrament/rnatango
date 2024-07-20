"use client";
import ModelsNucleotyde from "@/components/second-scenario/output/ModelsNucleotyde";
import ModelsRangeAngle from "@/components/second-scenario/output/ModelsRangeAngle";
import {
  second_scenario_result,
  second_scenario_result_dataset,
} from "@/types/modelsType";
import type { TabsProps } from "antd";
import { useEffect, useState } from "react";
import StackedLinePlot from "@/components/second-scenario/output/StackedLinePlot";
import ModelvsTarget from "@/components/second-scenario/output/ModelvsTarget";
import { Divider, Tabs } from "antd";
import HeatMap from "@/components/second-scenario/output/HeatMap";
import MCQstructure from "./MCQstructure";
import SelectedModelsForAnalyse from "./SelectedModelsForAnalyse";
import LCSta from "./LCSta";

const ResultModelsTarget = (props: { result: second_scenario_result }) => {
  const [models, setModels] = useState<{ [key: number]: string }[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [comparsionModelsMCQ, setComparsionModelsMCQ] = useState([]);
  const [dataset, setDataset] = useState<second_scenario_result_dataset[]>([]);
  const [sequence, setSequence] = useState<string>("");
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    let models_temp: { [key: number]: string }[] = [];
    let temp_models: any = [];
    let temp_comparsionModelsMCQ: any = [];
    let temp_seq: string[] = [];

    props.result.differences
      .sort((a, b) => a.modelMCQ - b.modelMCQ)
      .map((el, i) => {
        let model: any = [];
        props.result.differences[i].residues.map((residue, index) => {
          model.push({
            key: index,
            name: `${props.result.chain}.${residue.name}${residue.number}`,
            mcq: Number(
              props.result.differences[i].residueMCQs[index].toFixed(2)
            ),
          });
          residue.torsionAngles.map((angle) => {
            if (props.result.requestedAngles.includes(angle.angle)) {
              model[index][`${angle.angle.toLowerCase()}`] =
                angle.value !== null ? Number(angle.value.toFixed(2)) : null;
            }
          });
          if (i === 0) {
            temp_seq.push(residue.name);
            temp_comparsionModelsMCQ.push({
              key: index,
              name: `${props.result.chain}.${residue.name}${residue.number}`,
              dotbracket:
                props.result.differences[i].residues[index].dotBracketSymbol,
            });
          }
          temp_comparsionModelsMCQ[index][
            `${props.result.differences[i].modelName}`
          ] = Number(props.result.differences[i].residueMCQs[index].toFixed(2));
        });
        temp_models.push({
          [`${props.result.differences[i].modelName}`]: model,
        });
        models_temp.push({
          [i]: `${props.result.differences[i].modelName}`,
        });
      });

    setDataset(temp_models);
    setModels([...models_temp]);
    setSelectedModels(
      models_temp.map((model) => {
        return Object.values(model)[0];
      })
    );
    setComparsionModelsMCQ(temp_comparsionModelsMCQ);
    setSequence(temp_seq.join(""));
  }, [props.result]);

  const onChange = (key: string) => {
    setCurrentTab(Number(key));
  };

  const items: TabsProps["items"] = models.map((model) => {
    return {
      key: Object.keys(model)[0],
      label: Object.values(model)[0],
    };
  });

  return (
    <>
      {models.length != 0 ? (
        <>
          <SelectedModelsForAnalyse
            models={models}
            setSelectedModels={setSelectedModels}
            selectedModels={selectedModels}
            targetFileName={props.result.targetFileName}
          />
          <Divider />
          {selectedModels.length != 0 ? (
            <>
              <ModelsNucleotyde
                dataset={comparsionModelsMCQ}
                models={selectedModels}
              />
              <HeatMap dataset={comparsionModelsMCQ} models={selectedModels} />
              <ModelsRangeAngle
                dataset={comparsionModelsMCQ}
                models={selectedModels}
              />
              <h1 style={{ marginTop: "10px", marginBottom: "30px" }}>
                Angular parameters per model
              </h1>
              <Tabs
                centered
                type="card"
                items={items}
                onChange={onChange}
                style={{ width: "100%" }}
              />
              {dataset[currentTab] && (
                <>
                  <ModelvsTarget
                    dataset={Object.values(dataset[currentTab])[0]}
                    model={Object.keys(dataset[currentTab])[0]}
                    requestedAngles={[...props.result.requestedAngles, "mcq"]}
                  />
                  <StackedLinePlot
                    dataset={Object.values(dataset[currentTab])[0]}
                    requestedAngles={[...props.result.requestedAngles, "mcq"]}
                  />
                  <MCQstructure
                    modelHashId={
                      props.result.differences[currentTab].modelHashId
                    }
                  />
                </>
              )}
              <LCSta
                target={{
                  sequence: sequence,
                  targetId: props.result.targetHashId,
                }}
                lcs={props.result.differences.map((diff, index) => {
                  return {
                    lcs: diff.modelLCS,
                    name: `${diff.modelName}_${index + 1}`,
                    modelId: diff.modelHashId,
                    residue: diff.residues,
                  };
                })}
                chain={props.result.chain}
              />
            </>
          ) : (
            <p>no models selected</p>
          )}
        </>
      ) : null}
    </>
  );
};
export default ResultModelsTarget;
