/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSecret = /* GraphQL */ `
  query GetSecret($id: ID!) {
    getSecret(id: $id) {
      id
      secret
      attempts
      passwordType
      createdAt
      updatedAt
    }
  }
`;
export const listSecrets = /* GraphQL */ `
  query ListSecrets(
    $filter: ModelSecretFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSecrets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        secret
        attempts
        passwordType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
