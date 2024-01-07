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
