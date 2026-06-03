import { ADD_TASK, EDIT_TASK, DELETE_TASK } from "./actions";

const initialState = {
  // { [dayISO]: [{ id, text }] }
  tasksByDay: {},
};

function dailyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { dayISO, text } = action.payload;
      const trimmed = String(text ?? "").trim();
      if (!trimmed) return state;

      const nextTask = {
        id: Date.now(),
        text: trimmed,
      };

      const existing = state.tasksByDay[dayISO] ?? [];

      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [dayISO]: [...existing, nextTask],
        },
      };
    }

    case EDIT_TASK: {
      const { dayISO, taskId, text } = action.payload;
      const trimmed = String(text ?? "").trim();
      if (!trimmed) return state;

      const existing = state.tasksByDay[dayISO] ?? [];

      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [dayISO]: existing.map((t) => (t.id === taskId ? { ...t, text: trimmed } : t)),
        },
      };
    }

    case DELETE_TASK: {
      const { dayISO, taskId } = action.payload;
      const existing = state.tasksByDay[dayISO] ?? [];

      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [dayISO]: existing.filter((t) => t.id !== taskId),
        },
      };
    }

    default:
      return state;
  }
}

export default dailyReducer;

