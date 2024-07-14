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
import { Structure, StructureElement } from "molstar/lib/mol-model/structure";
import { ColorTheme } from "molstar/lib/mol-theme/color";
import { ThemeDataContext } from "molstar/lib/mol-theme/theme";
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
const { Panel } = Collapse;

// export const COLORS: Record<string, number> = {
//   PROTEIN: 0xff0000,
//   ION: 0x00ff00,
//   DNA: 0x000fff,
//   LIGAND: 0xff00ff,
//   RNAn: 0xcccccc,
//   RNA: 0xefb115,
// };
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
  representation: "cartoon" | "ball-and-stick" | "backbone"
) {
  console.log("addComponents check");

  const otherNucleotides =
    await plugin.builders.structure.tryCreateComponentFromExpression(
      structure,
      MS.struct.generator.atomGroups({ "residue-test": true }),
      `TEST-struct-component`,
      { label: "test" }
    );

  if (otherNucleotides) {
    await plugin.builders.structure.representation.addRepresentation(
      otherNucleotides,
      { type: representation }
    );
  }

  // if (componentOther_structure)
  //   return [list_of_rna_groups, componentOther_structure!.data];
}

const addStructure = async (
  plugin: PluginUIContext,
  structure_file: string,
  representation: "cartoon" | "ball-and-stick" | "backbone"
) => {
  const data = await plugin.builders.data.download(
    { url: structure_file },
    { state: { isGhost: true } }
  );

  const trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    "mmcif" // file_format
  );
  const model = await plugin.builders.structure.createModel(trajectory);
  const structure = await plugin.builders.structure.createStructure(model, {
    name: "model",
    params: {},
  });
  console.log("przed add components");
  await addComponents(plugin, structure, representation);
};

const createPlugin = async (
  parent: HTMLDivElement,
  structure_file: string,
  //   motif_files: { file: string; molecule: string }[],
  // contacts: inContactType[],
  representation: "cartoon" | "ball-and-stick" | "backbone"
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

  await addStructure(plugin, structure_file, representation);
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
  console.log("gggg");
  return { plugin };
};

type MolStarWrapperProps = {
  model_file: string;
  target_file: string;
  //   motif_files: { file: string; molecule: string }[];
  //   contacts: inContactType[];
  representation: "cartoon" | "ball-and-stick";
};

const MolStarWrapper = (props: MolStarWrapperProps) => {
  let parent_c: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();
  let [plugin, setPlugin] = useState<PluginUIContext | undefined>(undefined);

  useEffect(() => {
    console.log(props.model_file);

    if (!plugin) {
      createPlugin(
        parent_c.current!,
        props.model_file,

        props.representation
      ).then((v) => {
        console.log(v);

        setPlugin(v.plugin);
      });
    }
  }, [props.model_file]);

  useEffect(() => {
    if (plugin) {
      plugin.clear();
      addStructure(plugin, props.model_file, props.representation);
      console.log(plugin);
    }
  }, [props.representation]);

  return (
    <div
      style={{ height: "500px", width: "100%", position: "relative" }}
      ref={parent_c}
    ></div>
  );
};

export default MolStarWrapper;
