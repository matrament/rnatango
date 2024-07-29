import React, { Key, useEffect, useState } from "react";
import {
  DefaultPluginUISpec,
  PluginUISpec,
} from "molstar/lib/mol-plugin-ui/spec";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";

import "molstar/build/viewer/molstar.css";
import { ColorNames } from "molstar/lib/mol-util/color/names";
import { ParamDefinition as PD } from "molstar/lib/mol-util/param-definition";

import { Color } from "molstar/lib/mol-util/color";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";
import {
  StateObject,
  StateObjectRef,
  StateObjectSelector,
} from "molstar/lib/mol-state";
import {
  PluginStateObject,
  PluginStateObject as SO,
} from "molstar/lib/mol-plugin-state/objects";
import { Subscription } from "rxjs";
import { throttleTime } from "rxjs/operators";
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
// import { inContactType } from "../../types/types";
import { Expression } from "molstar/lib/mol-script/language/expression";
import { Type } from "molstar/lib/mol-script/language/type";
import { Collapse, Tooltip } from "antd";
import {
  range,
  second_scenario_result_differences_lcs,
} from "@/types/modelsType";
const { Panel } = Collapse;

const MolStarPluginSpec: PluginUISpec = {
  ...DefaultPluginUISpec(),
  config: [
    [PluginConfig.VolumeStreaming.Enabled, false],
    [PluginConfig.Viewport.ShowSettings, true],
    [PluginConfig.Viewport.ShowAnimation, false],
    [PluginConfig.Viewport.ShowSelectionMode, true],
  ],
  layout: {
    initial: {
      isExpanded: false,
      showControls: false,
      controlsDisplay: "reactive",
      regionState: {
        left: "full", // set to "hidden" to hide left panel
        top: "full", // set to "full" to show ACGU sequence
        right: "hidden",
        bottom: "hidden",
      },
    },
  },
  components: {
    remoteState: "none",
    viewport: {},
  },
};

async function addComponents(
  plugin: PluginUIContext,
  structure: StateObjectRef<SO.Molecule.Structure>,
  lcs: range,
  isTarget: boolean
) {
  // For each expression in nucleotides expression array, create tetrad component

  const commonComponent =
    await plugin.builders.structure.tryCreateComponentFromExpression(
      structure,
      MS.struct.generator.atomGroups({
        "residue-test": MS.core.logic.and([
          // Check if chain name is corresponding
          MS.core.rel.gre([MS.ammp("auth_seq_id"), lcs.fromInclusive]),
          MS.core.rel.lte([MS.ammp("auth_seq_id"), lcs.toInclusive]),
        ]),
      }),
      isTarget ? "target-component-common" : `model-component-common`,
      isTarget ? { label: `Target common` } : { label: `Model common` }
    );
  const otherComponent =
    await plugin.builders.structure.tryCreateComponentFromExpression(
      structure,
      MS.struct.generator.atomGroups({
        "residue-test": MS.core.logic.or([
          // Check if chain name is corresponding
          MS.core.rel.lt([lcs.toInclusive, MS.ammp("auth_seq_id")]),
          MS.core.rel.gr([lcs.fromInclusive, MS.ammp("auth_seq_id")]),
        ]),
      }),
      isTarget ? "target-component-other" : `model-component-other`,
      isTarget ? { label: `Target other` } : { label: `Model other` }
    );

  await plugin.builders.structure.representation.addRepresentation(
    commonComponent!,
    {
      type: "cartoon",
      color: "uniform", // Użyj stałego koloru
      colorParams: isTarget ? { value: 0x00c6b9 } : { value: 0xfb5f4c },
    }
  );

  await plugin.builders.structure.representation.addRepresentation(
    otherComponent!,
    {
      type: "cartoon",
      typeParams: { alpha: 0.2 },
      // alpha: 0.5,
      color: "uniform", // Użyj stałego koloru
      colorParams: isTarget ? { value: 0x00c6b9 } : { value: 0xfb5f4c },
    }
  );
}

const addStructure = async (
  plugin: PluginUIContext,
  target_file: string,
  model_file: string,
  lcs: second_scenario_result_differences_lcs
) => {
  const data_target = await plugin.builders.data.download(
    { url: target_file },
    { state: { isGhost: true } }
  );

  const trajectory_target = await plugin.builders.structure.parseTrajectory(
    data_target,
    "mmcif" // file_format
  );
  const model_target = await plugin.builders.structure.createModel(
    trajectory_target
  );
  const structure_target = await plugin.builders.structure.createStructure(
    model_target,
    {
      name: "model",
      params: {},
    }
  );

  const data_model = await plugin.builders.data.download(
    { url: model_file },
    { state: { isGhost: true } }
  );

  const trajectory_model = await plugin.builders.structure.parseTrajectory(
    data_model,
    "mmcif" // file_format
  );
  const model_model = await plugin.builders.structure.createModel(
    trajectory_model
  );
  const structure_model = await plugin.builders.structure.createStructure(
    model_model,
    {
      name: "model",
      params: {},
    }
  );

  await addComponents(plugin, structure_model, lcs.modelNucleotideRange, false);
  await addComponents(
    plugin,
    structure_target,
    lcs.targetNucleotideRange,
    true
  );
};

const createPlugin = async (
  parent: HTMLDivElement,
  target_file: string,
  model_file: string,
  lcs: second_scenario_result_differences_lcs
) => {
  let options = {
    target: parent,
    render: renderReact18,
    spec: MolStarPluginSpec,
  };

  const plugin = await createPluginUI(options);

  PluginCommands.Canvas3D.SetSettings(plugin, {
    settings: {
      renderer: {
        ...plugin.canvas3d!.props.renderer,
        backgroundColor: ColorNames.white,
      },
      camera: {
        ...plugin.canvas3d!.props.camera,
        helper: { axes: { name: "off", params: {} } },
      },
    },
  });
  // applyRNAsoloNeighbourhoodColorScheme(plugin!, parseResidues(contacts));

  await addStructure(plugin, target_file, model_file, lcs);
  plugin.behaviors.layout.leftPanelTabName.next("data");
  plugin.canvas3d?.camera.stateChanged
    .asObservable()
    .pipe(throttleTime(10, undefined, { leading: true, trailing: true }))!
    .subscribe((value) => {
      plugin.canvas3d?.camera.setState({
        fog: 0,
        clipFar: false,
        minNear: 0.1,
      });
    });
  return { plugin };
};

type MolStarWrapperProps = {
  model_file: string;
  target_file: string;
  lcs: second_scenario_result_differences_lcs;
};

const MolStarWrapper = (props: MolStarWrapperProps) => {
  let parent_c: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();
  let [plugin, setPlugin] = useState<PluginUIContext | undefined>(undefined);

  useEffect(() => {
    if (!plugin) {
      createPlugin(
        parent_c.current!,
        props.target_file,
        props.model_file,
        props.lcs
      ).then((v) => {
        setPlugin(v.plugin);
      });
    }
  }, []);

  useEffect(() => {
    if (plugin) {
      plugin.clear();
      addStructure(plugin, props.target_file, props.model_file, props.lcs);
    }
  }, [props.model_file]);

  return (
    <div
      style={{
        height: "650px",
        width: "100%",
        position: "relative",
        zIndex: "9999",
      }}
      ref={parent_c}
    ></div>
  );
};

export default MolStarWrapper;
