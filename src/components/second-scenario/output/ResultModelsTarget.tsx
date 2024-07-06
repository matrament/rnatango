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

const ResultModelsTarget = (props: { result: second_scenario_result }) => {
  const [models, setModels] = useState<{ [key: number]: string }[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [comparsionModelsMCQ, setComparsionModelsMCQ] = useState([]);
  const [dataset, setDataset] = useState<second_scenario_result_dataset[]>([]);
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    let models_temp: { [key: number]: string }[] = [];
    let temp_models: any = [];
    let temp_comparsionModelsMCQ: any = [];

    for (let i = 0; i < props.result.differences.length; i++) {
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
          temp_comparsionModelsMCQ.push({
            key: index,
            name: `${props.result.chain}.${residue.name}${residue.number}`,
            dotbracket:
              props.result.differences[i].residues[index].dotBracketSymbol,
          });
        }
        temp_comparsionModelsMCQ[index][props.result.differences[i].modelName] =
          Number(props.result.differences[i].residueMCQs[index].toFixed(2));
      });
      temp_models.push({ [props.result.differences[i].modelName]: model });
      models_temp.push({ [i]: props.result.differences[i].modelName });
    }

    setDataset(temp_models);
    setModels([...models_temp]);
    setSelectedModels(
      models_temp.map((model) => {
        return Object.values(model)[0];
      })
    );
    setComparsionModelsMCQ(temp_comparsionModelsMCQ);
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
      <SelectedModelsForAnalyse
        models={models}
        setSelectedModels={setSelectedModels}
      />
      <ModelsNucleotyde dataset={comparsionModelsMCQ} models={selectedModels} />
      <ModelsRangeAngle dataset={comparsionModelsMCQ} models={selectedModels} />
      <HeatMap dataset={comparsionModelsMCQ} models={selectedModels} />
      <h1>Specify model</h1>
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
            modelHashId={props.result.differences[currentTab].modelHashId}
          />
        </>
      )}
      <h1>LCS-ta</h1>
    </>
  );
};
export default ResultModelsTarget;
