import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
} from './store/task';
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';

const store = configureStore();

const App = (params) => {
  const state = useSelector((state) => state.entities);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteTask = (taskId) => {
    console.log(taskId);
    dispatch(taskDeleted(taskId));
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
