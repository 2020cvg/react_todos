import { setAlert } from './alert';
import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO
  } from './types';

  // Add todo
export const addTodo = (formData) => async (dispatch) => {
    dispatch({
        type: ADD_TODO,
        payload: formData
    });
    dispatch(setAlert('ToDo Created', 'success'));
};

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
    dispatch({
      type: DELETE_TODO,
      payload: id
    });
    dispatch(setAlert('ToDo Deleted', 'success'));
}
// Update todo
export const updateTodo = (formData) => async (dispatch) => {
    dispatch({
      type: UPDATE_TODO,
      payload: formData
    });
    dispatch(setAlert('ToDo Updated', 'success'));
}
