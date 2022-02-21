import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO
} from '../actions/types';
// import update from 'react-addons-update';
import update from 'immutability-helper';

const initialState = {
    todos: [],
    todo: null
};

function todoReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_TODO:
        case UPDATE_TODO:
            return {
                ...state,
                todos: [payload, ...state.todos]
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== payload)
            };
        default:
            return state;
  }
}

export default todoReducer;