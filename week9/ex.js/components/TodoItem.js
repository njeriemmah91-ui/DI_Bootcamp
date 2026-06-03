import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../redux/actions";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li>
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
          marginRight: 8,
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => dispatch(removeTodo(todo.id))}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;

