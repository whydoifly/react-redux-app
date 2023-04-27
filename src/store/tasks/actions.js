import * as actionTypes from './actionTypes';

export function taskCompleted(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, done: true },
  };
}

export function taskDeleted(id) {
  return {
    type: actionTypes.taskDeleted,
    payload: { id },
  };
}

export function titleChanged(id, title) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, title: `New title for ${id}` },
  };
}
