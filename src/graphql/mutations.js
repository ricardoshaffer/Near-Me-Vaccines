/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createStateInfo = /* GraphQL */ `
  mutation CreateStateInfo(
    $input: CreateStateInfoInput!
    $condition: ModelStateInfoConditionInput
  ) {
    createStateInfo(input: $input, condition: $condition) {
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
export const updateStateInfo = /* GraphQL */ `
  mutation UpdateStateInfo(
    $input: UpdateStateInfoInput!
    $condition: ModelStateInfoConditionInput
  ) {
    updateStateInfo(input: $input, condition: $condition) {
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
export const deleteStateInfo = /* GraphQL */ `
  mutation DeleteStateInfo(
    $input: DeleteStateInfoInput!
    $condition: ModelStateInfoConditionInput
  ) {
    deleteStateInfo(input: $input, condition: $condition) {
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
