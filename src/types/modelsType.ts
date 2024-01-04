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

export type selected_chains = {
  fileId: string;
  selections: [
    {
      modelName: string;
      chains: [
        {
          name: string;
          nucleotideRange: {
            fromInclusive: number;
            toInclusive: number;
          };
        }
      ];
    }
  ];
};
