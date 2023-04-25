import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function taskReducer(state, action) {
  switch (action.type) {
    case 'task/done':
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].done = true;
      return newArray;
    default:
      break;
  }
}

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

const store = createStore(taskReducer, [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn React 2', done: false },
]);

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch({
      type: 'task/done',
      payload: { id: taskId },
    });
  };

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.done}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
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
