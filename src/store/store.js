import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from './task';
import errorReducer from './errors';
import { logger } from './middleware/logger';

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(logger);
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export default createStore;
