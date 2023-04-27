import { createStore } from 'redux';
import { taskReducer } from './tasks/reducer';

const initialState = [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn React 2', done: false },
];

function configureStore() {
  return createStore(taskReducer, initialState);
}

export default configureStore;