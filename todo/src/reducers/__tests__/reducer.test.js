jest.mock("../initial-state", () => {
  return {
    initialState: {
      todos: [],
    },
  };
});

import reducer from "../todo";

describe("Reducer", () => {
  test("should add a todo item", () => {
    const initialState = {
      todos: []
    };

    const action = {
      type: "ADD_TODO",
      payload: {
        id: 0,
        title: "Read a book",
        date: '02/22/2022'
      },
    };

    const newState = reducer(initialState, action);

    console.log("TODO: " + newState.todos[0].title);
    console.log("TODO: " + newState.todos[0].date);

    expect(newState.todos[0].title).toEqual("Read a book");
    expect(newState.todos[0].date).toEqual("02/22/2022");
  });
});

describe("Reducer", () => {
  test("should delete a todo item", () => {
    const initialState = {
      todos: [{
        id: 0,
        title: "Read a book",
        date: '02/22/2022'
      }]
    };

    const action = {
      type: "DELETE_TODO",
      payload: 0
    };

    const newState = reducer(initialState, action);
    expect(newState.todos[0]).toBeUndefined();
  });
});
