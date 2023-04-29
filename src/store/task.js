import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';

const initialState = { entities: [], isLoading: true, error: null };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recieved(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      return state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recieved, taskRequested, taskRequestFailed } = actions;

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
