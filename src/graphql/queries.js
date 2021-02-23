/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      firstName
      lastName
      businessName
      businessPhone
      businessAddress
      city
      state
      zip
      lat
      lng
      image
      monO
      monC
      tueO
      tueC
      wedO
      wedC
      thuO
      thuC
      friO
      friC
      satO
      satC
      sunO
      sunC
      itemsIncluded
      walkInAvailable
      website
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        businessName
        businessPhone
        businessAddress
        city
        state
        zip
        lat
        lng
        image
        monO
        monC
        tueO
        tueC
        wedO
        wedC
        thuO
        thuC
        friO
        friC
        satO
        satC
        sunO
        sunC
        itemsIncluded
        walkInAvailable
        website
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStateInfo = /* GraphQL */ `
  query GetStateInfo($id: ID!) {
    getStateInfo(id: $id) {
      id
      stateID
      currentPhase
      history
      websiteState
      createdAt
      updatedAt
    }
  }
`;
export const listStateInfos = /* GraphQL */ `
  query ListStateInfos(
    $filter: ModelStateInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStateInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        stateID
        currentPhase
        history
        websiteState
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
