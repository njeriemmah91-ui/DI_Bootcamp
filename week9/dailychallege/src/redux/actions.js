export const ADD_TASK = "daily/ADD_TASK";
export const EDIT_TASK = "daily/EDIT_TASK";
export const DELETE_TASK = "daily/DELETE_TASK";

// dayISO: "YYYY-MM-DD"
export const addTask = ({ dayISO, text }) => ({
  type: ADD_TASK,
  payload: { dayISO, text },
});

export const editTask = ({ dayISO, taskId, text }) => ({
  type: EDIT_TASK,
  payload: { dayISO, taskId, text },
});

export const deleteTask = ({ dayISO, taskId }) => ({
  type: DELETE_TASK,
  payload: { dayISO, taskId },
});

