export const TASK_UPDATED = 'task/updated';
export const TASK_DELETED = 'task/deleted';

export function taskUpdated(id) {
  return {
    type: TASK_UPDATED,
    payload: { id, done: true },
  };
}

export function taskDeleted(id) {
  return {
    type: TASK_DELETED,
    payload: { id },
  };
}

export function titleChanged(id, title) {
  return {
    type: TASK_UPDATED ,
    payload: { id, title: `New title for ${id}` },
  };
}

function taskReducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED : {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = {
        ...newArray[elementIndex],
        ...action.payload,
      };
      return newArray;
    }
    case TASK_DELETED: {
      return state.filter((el) => el.id !== action.payload.id);
    }
    default:
      return state;
  }
}

export default taskReducer
