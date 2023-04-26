import { createStore } from 'redux';
import { taskReducer } from './taskReducer';

const initialState = [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn React 2', done: false },
];

export function initiateStore() {
  return createStore(taskReducer, initialState);
}
