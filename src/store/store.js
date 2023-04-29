import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task';
import { logger } from './middleware/logger';

function createStore() {
  return configureStore({
    reducer: taskReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(logger);
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export default createStore;
