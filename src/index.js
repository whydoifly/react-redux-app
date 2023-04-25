import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from './store/createStore';
import { taskReducer } from './store/taskReducer';
import * as actions from './store/actionTypes';

const initialState = [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn React 2', done: false },
];

const store = createStore(taskReducer, initialState);

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, done: true },
    });
  };

  const changeTitle = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, title: `New title for ${taskId}` },
    });
  };

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.done}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
