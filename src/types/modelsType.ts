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

export type pdb_id = {
  name: string;
};
export type single_scenario_request_selection_chain = {
  name: string;
  nucleotideRange: {
    fromInclusive: number;
    toInclusive: number;
  };
};
export type single_scenario_request_selection = {
  modelName: string;
  chains: single_scenario_request_selection_chain[];
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

export type torsion_angles_residue = {
  key: number;
  residue: string;
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
