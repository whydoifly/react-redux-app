import { createSlice, createAction } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';

const initialState = [];

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recieved(state, action) {
      return action.payload;
    },
    update(state, action) {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recieved } = actions;

const taskRequested = createAction('task/requested');
const taskRequestFailed = createAction('task/requestFailed');

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recieved(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function taskDeleted(id) {
  return remove({ id });
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export default taskReducer;
