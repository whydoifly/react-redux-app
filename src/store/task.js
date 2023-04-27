import { createAction, createReducer } from '@reduxjs/toolkit';

const update = createAction('task/updated');
const remove = createAction('task/removed');

const initialState = [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn React 2', done: false },
];

export function taskUpdated(id) {
  return update({ id, done: true });
}

export function taskDeleted(id) {
  return remove({ id });
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload,
      };
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id);
    });
});

export default taskReducer;
