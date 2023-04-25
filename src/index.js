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
]);

const App = (params) => {
  console.log(store.getState());

  const completeTask = () => {
    store.dispatch({
      type: 'task/done',
      payload: { id: 1 },
    });
    console.log(store.getState());
  };

  return (
    <>
      <h1>App</h1>
      <button onClick={completeTask}>Complete</button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
