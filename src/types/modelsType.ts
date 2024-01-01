export type Models = {
  [key: string]: SingleModel;
};

export type SingleModel = {
  [key: string]: Chains;
};

export type Chains = {
  [key: string]: string;
};
