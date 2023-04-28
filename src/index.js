import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { titleChanged, taskDeleted, completeTask } from './store/task';
import configureStore from './store/store';

const store = configureStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const deleteTask = (taskId) => {
    console.log(taskId);
    store.dispatch(taskDeleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.done}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
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
