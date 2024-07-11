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

export type second_scenario_result_differences_lcs = {
  targetNucleotideRange: {
    fromInclusive: number;
    toInclusive: number;
  };
  modelNucleotideRange: {
    fromInclusive: number;
    toInclusive: number;
  };
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
