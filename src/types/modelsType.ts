export type Models = {
  [key: string]: SingleModel;
};

export type SingleModel = {
  [key: string]: Chains;
};

export type Chains = {
  name: string;
  sequence: string;
  residuesWithoutAtoms: number[];
};

export type Target = {
  [key: string]: SingleModelTarget;
};

export type SingleModelTarget = {
  [key: string]: ChainTarget;
};

export type ChainTarget = {
  name: string;
  sequence: string;
  residuesWithoutAtoms: number[];
  continousFragments: number[][];
};

export type pdb_id = {
  name: string;
};
export type request_selection_chain = {
  name: string;
  nucleotideRange: {
    fromInclusive: number;
    toInclusive: number;
  };
};
export type single_scenario_request_selection = {
  modelName: string;
  chains: request_selection_chain[];
};
export type single_scenario_request = {
  fileId: string;
  selections: single_scenario_request_selection[];
};

export type structure = {
  fileHashId: string;
  models: [
    {
      name: string;
      chains: [
        {
          name: string;
          sequence: string;
          residuesWithoutAtoms: number[];
        }
      ];
    }
  ];
};

// Result TORSION ANGLES
export type single_result_angle_chain_residues = {
  name: string;
  number: number;
  icode: string;
  torsionAngles: result_torsion_angles[];
};

export type result_torsion_angles = {
  angle: string;
  value: number;
};

export type single_result_angle_chain = {
  chain: {
    name: string;
    sequence: string;
    residuesWithoutAtoms: number[];
  };
  residues: single_result_angle_chain_residues[];
};

export type single_result_angle = {
  torsionAngles: single_result_angle_chain[];
  containDiscontinuousSequences: boolean;
  resultRemovedAfter: string;
  structureMolecule: string;
  structureName: string;
  structureTitle: string;
};
//................................
export type torsion_angles_residue = {
  key: number;
  name: string;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  delta: number | null;
  epsilon: number | null;
  zeta: number | null;
  eta: number | null;
  theta: number | null;
  eta_prim: number | null;
  theta_prim: number | null;
  chi: number | null;
  p: number | null;
};

export type torsion_angles = {
  chain: {
    name: string;
    sequence: string;
    residueWithoutAtom: number[];
  };
  residues: torsion_angles_residue[];
};

export type scenario = {
  title: string;
  example: string[];
  scenario: number;
};

export type resultSecondScenario = {
  name: string;
  key: number;
  models: {
    [key: string]: result_second_scenario_nucleotide_value;
  };
};

export type result_second_scenario_nucleotide_value = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  delta: number | null;
  epsilon: number | null;
  zeta: number | null;
  eta: number | null;
  theta: number | null;
  eta_prim: number | null;
  theta_prim: number | null;
  chi: number | null;
  mcq: number;
};

export type second_scenario_target = {
  targetHashId: string;
  selection: {
    modelName: string;
    chains: request_selection_chain[];
  };
};

export type second_scenario_models_target = {
  target: {
    sequence: string;
    sourceSelection: {
      modelName: string;
      chains: request_selection_chain[];
    };
    selection: {
      modelName: string;
      chains: request_selection_chain[];
    };
  };
  models: second_scenario_models[];
};

export type second_scenario_models = {
  fileId: string;
  fileName: string;
  sequence: string;
  selection: {
    modelName: string;
    chains: request_selection_chain[];
  };
  sourceSelection: {
    modelName: string;
    chains: request_selection_chain[];
  };
};

export type second_scenario_submit = {
  taskHashId: string;
  angles: string[];
  threshold: number;
};

export type second_scenario_result = {
  resultRemovedAfter: string;
  model: string;
  targetHashId: string;
  targetFileName: string;
  chain: string;
  lcsThreshold: number;
  requestedAngles: string[];
  differences: second_scenario_result_differences[];
};

export type second_scenario_result_differences = {
  modelHashId: string;
  modelName: string;
  model: string;
  modelMCQ: number;
  residues: second_scenario_result_differences_residues[];
  residueMCQs: number[];
  modelLCS: second_scenario_result_differences_lcs;
};
export type range = {
  fromInclusive: number;
  toInclusive: number;
};
export type second_scenario_result_differences_lcs = {
  targetNucleotideRange: range;
  modelNucleotideRange: range;
  validResidues: number;
  coveragePercent: number;
  fragmentMCQ: number;
};

export type second_scenario_result_differences_residues = {
  name: string;
  number: number;
  dotBracketSymbol: string;
  icode: string;
  torsionAngles: result_torsion_angles[];
};

export type second_scenario_result_dataset = {
  [key: string]: second_scenario_result_dataset_single_model[];
};

export type second_scenario_result_dataset_single_model = {
  key: number;
  name: string;
  mcq: number | null;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  delta: number | null;
  epsilon: number | null;
  zeta: number | null;
  eta: number | null;
  theta: number | null;
  eta_prim: number | null;
  theta_prim: number | null;
  chi: number | null;
};

export type angles_result = {
  mcq: string;
  alpha: string;
  beta: string;
  gamma: string;
  delta: string;
  epsilon: string;
  zeta: string;
  eta: string;
  theta: string;
  eta_prim: string;
  theta_prim: string;
  chi: string;
};

export type third_scenario_set_model = {
  taskHashId: string;
  models: third_scenario_set_model_model[];
  sequences: third_scenario_set_model_sequences[];
};

export type third_scenario_set_model_model = {
  fileId: string;
  fileName: string;
  sequence: string;
  selection: {
    modelName: string;
    chains: third_scenario_set_model_model_chain[];
  } | null;
  sourceSelection: {
    modelName: string;
    chains: third_scenario_set_model_model_chain[];
  };
};

export type third_scenario_set_model_model_chain = {
  name: string;
  sequence: string;
  nucleotideRange: {
    fromInclusive: number;
    toInclusive: number;
  };
};

export type third_scenario_set_model_sequences = {
  name: string;
  sequence: string;
};

export type third_scenario_submit = {
  taskHashId: string;
  chain: string;
  angles: string[];
  threshold: number;
};

export type third_scenario_result = {
  resultRemovedAfter: string;
  model: string;
  chain: string;
  requestedAngles: string[];
  structureModels: string[];
  oneManyResults: third_scenario_result_oneManyResults[];
};

export type third_scenario_result_oneManyResults = {
  targetHashId: string;
  targetFileName: string;
  lcsThreshold: number;
  differences: second_scenario_result_differences[];
};

export type clustering = {
  numberClusters: number;
  models: clustering_models[];
};

export type clustering_models = {
  x: number;
  y: number;
  name: string;
  clusterNumber: number;
};
