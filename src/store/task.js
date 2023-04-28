import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn React 2', done: false },
];

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
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
const { update, remove } = actions;

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, done: true }));
};

export function taskDeleted(id) {
  return remove({ id });
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export default taskReducer;
