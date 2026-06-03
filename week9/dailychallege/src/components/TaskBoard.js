import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../redux/actions";

function TaskBoard({ selectedDay }) {
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state) => state.daily?.tasksByDay?.[selectedDay] ?? []
  );


  const [newText, setNewText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const canAdd = useMemo(() => newText.trim().length > 0, [newText]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!canAdd) return;
    dispatch(addTask({ dayISO: selectedDay, text: newText }));
    setNewText("");
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const trimmed = editingText.trim();
    if (!trimmed || editingId === null) return;
    dispatch(editTask({ dayISO: selectedDay, taskId: editingId, text: trimmed }));
    handleCancelEdit();
  };

  return (
    <div className="panel">
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>Tasks for {selectedDay}</h2>

      <form className="taskForm" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a task"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button type="submit" disabled={!canAdd}>
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty">No tasks yet for this day.</div>
      ) : (
        tasks.map((task) => {
          const isEditing = editingId === task.id;

          return (
            <div className="taskItem" key={task.id}>
              <div className="left" style={{ flex: 1 }}>
                {isEditing ? (
                  <form onSubmit={handleSaveEdit} style={{ width: "100%" }}>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                    />
                    <div className="btnRow" style={{ marginTop: 8 }}>
                      <button className="btn primary" type="submit">
                        Save
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text">{task.text}</div>
                )}
              </div>

              {!isEditing && (
                <div className="btnRow">
                  <button className="btn" type="button" onClick={() => handleStartEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="btn danger"
                    type="button"
                    onClick={() => dispatch(deleteTask({ dayISO: selectedDay, taskId: task.id }))}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default TaskBoard;

