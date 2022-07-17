/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSecretInput = {
  id?: string | null,
  secret: string,
  attempts?: number | null,
  passwordType: string,
};

export type ModelSecretConditionInput = {
  secret?: ModelStringInput | null,
  attempts?: ModelIntInput | null,
  passwordType?: ModelStringInput | null,
  and?: Array< ModelSecretConditionInput | null > | null,
  or?: Array< ModelSecretConditionInput | null > | null,
  not?: ModelSecretConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Secret = {
  __typename: "Secret",
  id: string,
  secret: string,
  attempts?: number | null,
  passwordType: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSecretInput = {
  id: string,
  secret?: string | null,
  attempts?: number | null,
  passwordType?: string | null,
};

export type DeleteSecretInput = {
  id: string,
};

export type ModelSecretFilterInput = {
  id?: ModelIDInput | null,
  secret?: ModelStringInput | null,
  attempts?: ModelIntInput | null,
  passwordType?: ModelStringInput | null,
  and?: Array< ModelSecretFilterInput | null > | null,
  or?: Array< ModelSecretFilterInput | null > | null,
  not?: ModelSecretFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSecretConnection = {
  __typename: "ModelSecretConnection",
  items:  Array<Secret | null >,
  nextToken?: string | null,
};

export type CreateSecretMutationVariables = {
  input: CreateSecretInput,
  condition?: ModelSecretConditionInput | null,
};

export type CreateSecretMutation = {
  createSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSecretMutationVariables = {
  input: UpdateSecretInput,
  condition?: ModelSecretConditionInput | null,
};

export type UpdateSecretMutation = {
  updateSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSecretMutationVariables = {
  input: DeleteSecretInput,
  condition?: ModelSecretConditionInput | null,
};

export type DeleteSecretMutation = {
  deleteSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSecretQueryVariables = {
  id: string,
};

export type GetSecretQuery = {
  getSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSecretsQueryVariables = {
  filter?: ModelSecretFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSecretsQuery = {
  listSecrets?:  {
    __typename: "ModelSecretConnection",
    items:  Array< {
      __typename: "Secret",
      id: string,
      secret: string,
      attempts?: number | null,
      passwordType: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSecretSubscription = {
  onCreateSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSecretSubscription = {
  onUpdateSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSecretSubscription = {
  onDeleteSecret?:  {
    __typename: "Secret",
    id: string,
    secret: string,
    attempts?: number | null,
    passwordType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
