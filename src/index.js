import React from 'react';
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

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
  }

  return { getState, dispatch };
}

const store = createStore(taskReducer, [
  { id: 1, description: 'Learn React', done: false },
  { id: 2, description: 'Learn React 2', done: false },
]);

const App = (params) => {
  const state = store.getState();

  const completeTask = (taskId) => {
    store.dispatch({
      type: 'task/done',
      payload: { id: taskId },
    });
    console.log(store.getState());
  };

  return (
    <>
      <h1>App</h1>
      
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.completed}`}</p>
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
