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
import { StructureElement } from "molstar/lib/mol-model/structure";
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
        top: "hidden", // set to "full" to show ACGU sequence
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

// function parseContact(q: inContactType[]) {
//   let molecules_incontact = new Map<string, string[]>();

//   let contactsResidues: {
//     chainId: string;
//     residueId: number;
//     molecule: string;
//   }[] = [];
//   q.forEach((structure: inContactType) => {
//     structure.contacts.forEach(
//       (v: {
//         rna_residue_id: string;
//         other: {
//           residue_id: string;
//           resname: string;
//         }[];
//       }) => {
//         let check: [];
//         v.other.forEach((nucleotide) => {
//           const chainId = nucleotide.residue_id.split(".")[0];
//           const numbers = nucleotide.residue_id.split(".")[1];
//           if (!numbers) return;
//           const residueId = parseInt(numbers, 10);
//           if (!molecules_incontact.has(nucleotide.residue_id))
//             molecules_incontact.set(nucleotide.residue_id, []);
//           molecules_incontact.set(
//             nucleotide.residue_id,
//             molecules_incontact
//               .get(nucleotide.residue_id)!
//               .concat([structure.molecule])
//           );
//         });

//         const chainId = v.rna_residue_id.split(".")[0];
//         const numbers = v.rna_residue_id.split(".")[1];
//         if (!numbers) return;
//         const residueId = parseInt(numbers, 10);
//         if (!molecules_incontact.has(v.rna_residue_id))
//           molecules_incontact.set(v.rna_residue_id, []);
//         molecules_incontact.set(
//           v.rna_residue_id,
//           molecules_incontact
//             .get(v.rna_residue_id)!
//             .concat([structure.molecule])
//         );
//       }
//     );
//   });
//   molecules_incontact.forEach((v: string[], k: string, l) => {
//     if (v.length == 1)
//       contactsResidues.push({
//         chainId: k.split(".")[0],
//         residueId: parseInt(k.split(".")[1], 10),
//         molecule: v[0],
//       });
//     else
//       contactsResidues.push({
//         chainId: k.split(".")[0],
//         residueId: parseInt(k.split(".")[1], 10),
//         molecule: "MORE",
//       });
//   });
//   return contactsResidues;
// }

// function parseResidues(q: inContactType[]) {
//   let contactsResidues: {
//     chainId: string;
//     residueId: number;
//     molecule: string;
//   }[] = [];
//   q.forEach((structure: inContactType) => {
//     structure.contacts.forEach(
//       (v: {
//         rna_residue_id: string;
//         other: {
//           residue_id: string;
//           resname: string;
//         }[];
//       }) => {
//         let check: [];
//         v.other.forEach((nucleotide) => {
//           const chainId = nucleotide.residue_id.split(".")[0];
//           const numbers = nucleotide.residue_id.split(".")[1];
//           if (!numbers) return;
//           const residueId = parseInt(numbers, 10);
//           contactsResidues.push({
//             chainId,
//             residueId,
//             molecule: structure.molecule.toLocaleUpperCase(),
//           });
//         });

//         const chainId = v.rna_residue_id.split(".")[0];
//         const numbers = v.rna_residue_id.split(".")[1];
//         if (!numbers) return;
//         const residueId = parseInt(numbers, 10);
//         contactsResidues.push({ chainId, residueId, molecule: "RNA" });
//       }
//     );
//   });
//   return contactsResidues;
// }

// async function addContactComponents(
//   plugin: PluginUIContext,
//   structure: StateObjectRef<SO.Molecule.Structure>,
//   representation: "cartoon" | "ball-and-stick",
//     contact: inContactType[],
//   molecule: string
// ) {
//   let component_structure: any = undefined;
//   let componentOther_structure: any = undefined;
//   if (molecule != "RNA") {
//     const component =
//       await plugin.builders.structure.tryCreateComponentFromExpression(
//         structure,
//         MS.struct.generator.atomGroups({ "residue-test": true }),
//         `${molecule}-struct-component`,
//         { label: molecule.toLocaleUpperCase() }
//       );
//     component_structure =
//       await plugin.builders.structure.representation.addRepresentation(
//         component!,
//         { type: representation, color: "neighbourhood" as any }
//       );

//     return [component_structure!.data, undefined];
//   }
//   let global_nucleotideExpressions: Expression = MS.core.logic.or([]);
//   let list_of_rna_groups: any = [];
//     contact.forEach(async (contact_l: inContactType) => {
//       const nucleotideExpressions = MS.core.logic.or(
//         parseContact(
//           contact.filter(
//             (x) => x.molecule == contact_l.molecule.toLocaleUpperCase()
//           )
//         ).map(
//           (nucleotide: {
//             molecule: string;
//             chainId: string;
//             residueId: number;
//           }) =>
//             MS.core.logic.and([
//               // Check if chain name is corresponding
//               MS.core.rel.eq([nucleotide?.chainId, MS.ammp("auth_asym_id")]),
//               // Check if residue number is corresponding
//               MS.core.rel.eq([nucleotide?.residueId, MS.ammp("auth_seq_id")]),
//             ])
//         )
//       );

//   global_nucleotideExpressions = MS.core.logic.or([
//     global_nucleotideExpressions,
//     nucleotideExpressions,
//   ]);

//     const contactComponent =
//       await plugin.builders.structure.tryCreateComponentFromExpression(
//         structure,
//         MS.struct.generator.atomGroups({
//           "residue-test": nucleotideExpressions,
//         }),
//         `${contact_l.molecule}-component`,
//         { label: "In interaction with " + contact_l.molecule }
//       );

//     if (contactComponent) {
//       list_of_rna_groups.push(
//         (
//           await plugin.builders.structure.representation.addRepresentation(
//             contactComponent,
//             {
//               type: representation,
//               color: "neighbourhood" as any,
//             }
//           )
//         ).data
//       );
//     }
//   });

//   const otherNucleotides =
//     await plugin.builders.structure.tryCreateComponentFromExpression(
//       structure,
//       MS.struct.generator.atomGroups({
//         "residue-test": MS.core.logic.not([global_nucleotideExpressions]),
//       }),
//       "rest of the structure",
//       { label: "Rest of the structure" }
//     );
//   if (otherNucleotides) {
//     componentOther_structure =
//       await plugin.builders.structure.representation.addRepresentation(
//         otherNucleotides,
//         { type: representation, color: "neighbourhood" as any },
//         {
//           initialState: {
//             isHidden: true,
//           },
//         }
//       );
//   }
//   if (componentOther_structure)
//     return [list_of_rna_groups, componentOther_structure!.data];
//   else return [list_of_rna_groups, undefined];
// }

// function applyRNAsoloNeighbourhoodColorScheme(
//   plugin: PluginUIContext,
//   residues: { molecule: string; chainId: string; residueId: number }[]
// ) {
//   function RNAsoloNeighbourhoodColorScheme(
//     ctx: ThemeDataContext,
//     props: PD.Values<{}>
//   ): ColorTheme<{}> {
//     return {
//       factory: RNAsoloNeighbourhoodColorScheme,
//       granularity: "groupInstance",
//       color: (location) => {
//         let unit: any = undefined;
//         let element: any = undefined;
//         if (!StructureElement.Location.is(location)) {
//           if (location.kind != "bond-location") return ColorNames.gray;
//           unit = location.bUnit;
//           element = location.aUnit.elements[0];
//         } else {
//           unit = location.unit;
//           element = location.element;
//         }

//         let outputColor = Color(0xcccccc);
//         const atom_data = unit.model.atomicHierarchy;
//         let residue: string;
//         if (/\d+/.test(atom_data.atoms.auth_comp_id.value(element))) {
//           residue =
//             atom_data.chains.auth_asym_id
//               .value(atom_data.chainAtomSegments.index[element])
//               .toString() +
//             "." +
//             atom_data.residues.auth_seq_id
//               .value(atom_data.residueAtomSegments.index[element])
//               .toString();
//         } else {
//           residue =
//             atom_data.chains.auth_asym_id
//               .value(atom_data.chainAtomSegments.index[element])
//               .toString() +
//             "." +
//             atom_data.residues.auth_seq_id
//               .value(atom_data.residueAtomSegments.index[element])
//               .toString();
//         }

//         residues.forEach((x) => {
//           if (x.chainId + "." + x.residueId == residue) {
//             outputColor = Color(COLORS[x.molecule.toUpperCase()]);
//           }
//         });
//         return outputColor;
//       },
//       props: props,
//       description: "",
//     };
//   }

//   const RNAsoloNeighbourhoodColorSchemeProvider: ColorTheme.Provider<
//     {},
//     "neighbourhood"
//   > = {
//     name: "neighbourhood",
//     label: "Neighbourhood",
//     category: "RNAsolo neighbourhood",
//     factory: RNAsoloNeighbourhoodColorScheme,
//     getParams: () => ({}),
//     isApplicable: () => true,
//     defaultValues: {},
//   };
//   try {
//     plugin.representation.structure.themes.colorThemeRegistry.add(
//       RNAsoloNeighbourhoodColorSchemeProvider
//     );
//   } catch (e) {}
//   // for (const s of plugin.managers.structure.hierarchy.current.structures) {
//   //   plugin.managers.structure.component.updateRepresentationsTheme(
//   //     s.components,
//   //     { color: RNAsoloNeighbourhoodColorSchemeProvider.name as any }
//   //   );
//   // }
// }

const addStructure = async (
  plugin: PluginUIContext,
  url: { file: string; molecule: string },
  representation: "cartoon" | "ball-and-stick"
  //   contacts: inContactType[]
) => {
  const data = await plugin.builders.data.download(
    { url: url.file },
    { state: { isGhost: true } }
  );
  // try {
  const file_format: "mmcif" | "pdb" =
    url.file.split(".")[url.file.split(".").length - 1] === "cif"
      ? "mmcif"
      : "pdb";
  const trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    file_format
  );
  const model = await plugin.builders.structure.createModel(trajectory);
  const structure = await plugin.builders.structure.createStructure(model);
  //   return await addContactComponents(
  //     plugin,
  //     structure,
  //     representation,
  //     // contacts,
  //     url.molecule
  //   );
  // } catch (e) {

  // }
};
const createPlugin = async (
  parent: HTMLDivElement,
  structure_file: string,
  //   motif_files: { file: string; molecule: string }[],
  // contacts: inContactType[],
  representation: "cartoon" | "ball-and-stick"
  // visibility: { 'rna': any, 'rna_motif': any, 'dna_motif': any, 'protein_motif': any, 'ligand_motif': any, 'ion_motif': any },
  // setVisibility: any
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

  // await addStructure(plugin, { file: structure_file, molecule: 'RNA' }, representation, contacts);
  // await motif_files.forEach((url: { file: string, molecule: string }) => {
  //   addStructure(plugin, url, representation, contacts);
  // })
  // let temp = { 'rna': undefined, 'rna_motif': undefined, 'dna_motif': undefined, 'protein_motif': undefined, 'ligand_motif': undefined, 'ion_motif': undefined }
  // motif_files.forEach(async (url: { file: string, molecule: string }) => {
  //   let v2 = await addStructure(plugin!, url, representation, contacts)
  //   switch (url.molecule) {
  //     case 'DNA':
  //       temp['dna_motif'] = v2![0]
  //       break;
  //     case 'ion':
  //       temp['ion_motif'] = v2![0]
  //       break;
  //     case 'protein':
  //       temp['protein_motif'] = v2![0]
  //       break;
  //     case 'ligand':
  //       temp['ligand_motif'] = v2![0]
  //       break

  //   }
  // })
  let v = await addStructure(
    plugin,
    { file: structure_file, molecule: "RNA" },
    representation
  );
  // temp['rna'] = v![1]
  // temp['rna_motif'] = v![0]
  // // v![1].repr.setState({...v![1].repr,visible:true})
  // setVisibility(temp)

  // applyRNAsoloNeighbourhoodColorScheme(plugin!, parseResidues(contacts));

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
  structure_file: string;
  //   motif_files: { file: string; molecule: string }[];
  //   contacts: inContactType[];
  representation: "cartoon" | "ball-and-stick";
};

const MolStarWrapper = (props: MolStarWrapperProps) => {
  let parent_c: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();
  let [plugin, setPlugin] = useState<PluginUIContext | undefined>(undefined);
  //   const [visibility, setVisibility] = useState<{
  //     rna: any;
  //     rna_motif: any;
  //     dna_motif: any;
  //     protein_motif: any;
  //     ligand_motif: any;
  //     ion_motif: any;
  //   }>({
  //     rna: undefined,
  //     rna_motif: undefined,
  //     dna_motif: undefined,
  //     protein_motif: undefined,
  //     ligand_motif: undefined,
  //     ion_motif: undefined,
  //   });

  useEffect(() => {
    if (!plugin) {
      createPlugin(
        parent_c.current!,
        props.structure_file,
        // props.motif_files,
        // props.contacts,
        props.representation
        //   visibility,
        //   setVisibility
      ).then((v) => {
        setPlugin(v.plugin);
        //   applyRNAsoloNeighbourhoodColorScheme(
        //     v.plugin!,
        //     parseResidues(props.contacts)
        //   );
      });
    }
  }, []);

  useEffect(() => {
    if (plugin) {
      plugin.clear();
      //   applyRNAsoloNeighbourhoodColorScheme(plugin!, parseResidues(props.contacts));
      //   addStructure(plugin, { file: props.structure_file, molecule: 'RNA' }, props.representation, props.contacts).then(() => {
      //     props.motif_files.forEach((url: { file: string, molecule: string }) => {
      //       addStructure(plugin!, url, props.representation, props.contacts).then(() => {
      //       })
      //     })
      //   })
      //   if (props.contacts)
      //     applyRNAsoloNeighbourhoodColorScheme(plugin!, parseResidues(props.contacts));
    }
  }, []);

  //   useEffect(() => {
  //     // if (visibility['protein_motif'])
  //     //   visibility['protein_motif']!.repr.setState({ ...visibility['protein_motif']!.repr, visible: false })
  //     console.log(visibility);
  //   }, [visibility]);

  return (
    <div>
      <div
        style={{ height: "400px", width: "1000px", position: "relative" }}
        ref={parent_c}
      ></div>
      <br />
      {/* {Object.values(visibility).some((x) => x != undefined) ? (
        <Collapse defaultActiveKey={1}>
          <Panel header="Color codes" key="1">
            <div
              style={{
                verticalAlign: "center",
                width: "100%",
                tableLayout: "fixed",
                textAlign: "center",
                fontSize: "20px",
              }}
              className="color-codes"
            >
              {visibility.ion_motif ? (
                <Tooltip title={"Click to show/hide"}>
                  <div
                    className="vertical-align"
                    onClick={() => {
                      visibility["ion_motif"].repr.setState({
                        ...visibility["ion_motif"].repr.state,
                        visible: !visibility["ion_motif"].repr.state.visible,
                      });
                      plugin!.canvas3d?.update();
                    }}
                  >
                    <span>Ion in motif</span>
                    <div
                      style={{
                        backgroundColor: "#00ff00",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              ) : (
                <></>
              )}

              {visibility.dna_motif ? (
                <Tooltip title={"Click to show/hide"}>
                  <div
                    className="vertical-align"
                    onClick={() => {
                      visibility["dna_motif"].repr.setState({
                        ...visibility["dna_motif"].repr.state,
                        visible: !visibility["dna_motif"].repr.state.visible,
                      });
                      plugin!.canvas3d?.update();
                    }}
                  >
                    <span>DNA in motif</span>
                    <div
                      style={{
                        backgroundColor: "#000fff",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              ) : (
                <></>
              )}

              {visibility.ligand_motif ? (
                <Tooltip title={"Click to show/hide"}>
                  <div
                    className="vertical-align"
                    onClick={() => {
                      visibility["ligand_motif"].repr.setState({
                        ...visibility["ligand_motif"].repr.state,
                        visible: !visibility["ligand_motif"].repr.state.visible,
                      });
                      plugin!.canvas3d?.update();
                    }}
                  >
                    <span>Ligand in motif</span>
                    <div
                      style={{
                        backgroundColor: "#ff00ff",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              ) : (
                <></>
              )}

              {visibility.protein_motif ? (
                <Tooltip title={"Click to show/hide"}>
                  <div
                    className="vertical-align"
                    onClick={() => {
                      visibility["protein_motif"].repr.setState({
                        ...visibility["protein_motif"].repr.state,
                        visible:
                          !visibility["protein_motif"].repr.state.visible,
                      });
                      plugin!.canvas3d?.update();
                    }}
                  >
                    <span>Protein in motif</span>
                    <div
                      style={{
                        backgroundColor: "#ff0000",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              ) : (
                <></>
              )}

              {visibility.rna_motif ? (
                <Tooltip title={"Click to show/hide"}>
                  <div
                    className="vertical-align"
                    onClick={() => {
                      visibility["rna_motif"].forEach((v: any) => {
                        v.repr.setState({
                          ...v.repr.state,
                          visible: !v.repr.state.visible,
                        });
                      });
                      plugin!.canvas3d?.update();
                    }}
                  >
                    <span>RNA in motif</span>
                    <div
                      style={{
                        backgroundColor: "#efb115",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              ) : (
                <></>
              )}

              {visibility.rna ? (
                <Tooltip title={"Click to show/hide"}>
                  <div
                    className="vertical-align"
                    onClick={() => {
                      visibility["rna"].repr.setState({
                        ...visibility["rna"].repr.state,
                        visible: !visibility["rna"].repr.state.visible,
                      });
                      plugin!.canvas3d?.update();
                    }}
                  >
                    <span>RNA</span>
                    <div
                      style={{
                        backgroundColor: "#cccccc",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              ) : (
                <></>
              )} */}
      {/* </div>
          </Panel>
        </Collapse>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default MolStarWrapper;
