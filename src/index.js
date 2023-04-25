import React from 'react';
import ReactDOM from 'react-dom/client';

function createStore(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  function dispatch(action) {
    console.log(action);
    if (action.type === 'task/done') {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].done = true;
      state = newArray;
      console.log(state);
      // state = state.map((task) => {
      //   if (task.id === action.payload.id) {
      //     return { ...task, done: true };
      //   }
      //   return task;
      // });
    }
  }
  return { getState, dispatch };
}

const store = createStore([{ id: 1, description: 'Learn React', done: false }]);

const App = (params) => {
  console.log(store.getState());

  return (
    <>
      <h1>App</h1>
      <button
        onClick={() =>
          store.dispatch({ type: 'task/done', payload: { id: 1 } })
        }>
        Complete
      </button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
