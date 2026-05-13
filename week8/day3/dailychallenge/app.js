import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useState
} from "react";

import "bootstrap/dist/css/bootstrap.min.css";

//
// CONTEXT
//
const TaskContext = createContext();

//
// REDUCER
//
const initialState = {
  tasks: [],
  filter: "all" // all | completed | active
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        )
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        )
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
}

//
// APP COMPONENT
//
function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const inputRef = useRef();

  const addTask = () => {
    const value = inputRef.current.value;
    if (!value) return;

    dispatch({
      type: "ADD_TASK",
      payload: value
    });

    inputRef.current.value = "";
  };

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "completed")
      return task.completed;

    if (state.filter === "active")
      return !task.completed;

    return true;
  });

  return (
    <TaskContext.Provider
      value={{ state, dispatch }}
    >
      <div className="container mt-5">
        <h1>Task Manager</h1>

        {/* ADD TASK */}
        <div className="d-flex gap-2">
          <input
            ref={inputRef}
            className="form-control"
            placeholder="Enter task..."
          />

          <button
            className="btn btn-primary"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {/* FILTER BUTTONS */}
        <div className="mt-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() =>
              dispatch({
                type: "SET_FILTER",
                payload: "all"
              })
            }
          >
            All
          </button>

          <button
            className="btn btn-success me-2"
            onClick={() =>
              dispatch({
                type: "SET_FILTER",
                payload: "completed"
              })
            }
          >
            Completed
          </button>

          <button
            className="btn btn-warning"
            onClick={() =>
              dispatch({
                type: "SET_FILTER",
                payload: "active"
              })
            }
          >
            Active
          </button>
        </div>

        {/* TASK LIST */}
        <TaskList tasks={filteredTasks} />
      </div>
    </TaskContext.Provider>
  );
}

//
// TASK LIST
//
function TaskList({ tasks }) {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

//
// TASK ITEM (EDIT + REF USED HERE)
//
function TaskItem({ task }) {
  const { dispatch } = useContext(TaskContext);

  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef();

  const saveEdit = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: task.id,
        text: editRef.current.value
      }
    });

    setIsEditing(false);
  };

  return (
    <div className="card p-2 mt-2">
      {isEditing ? (
        <div className="d-flex gap-2">
          <input
            ref={editRef}
            defaultValue={task.text}
            className="form-control"
          />

          <button
            className="btn btn-success"
            onClick={saveEdit}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <span
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",
              cursor: "pointer"
            }}
            onClick={() =>
              dispatch({
                type: "TOGGLE_TASK",
                payload: task.id
              })
            }
          >
            {task.text}
          </span>

          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                dispatch({
                  type: "DELETE_TASK",
                  payload: task.id
                })
              }
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;