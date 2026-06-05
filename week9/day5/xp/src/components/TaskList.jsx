import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByCategory, selectCompletedTasks, selectCategoryById } from '../redux/selectors';
import { deleteTask, toggleTaskCompletion } from '../redux/slices/tasksSlice';

function TaskList({ selectedCategory }) {
  const dispatch = useDispatch();

  // Get tasks for selected category using memoized selector
  const getTasksByCategory = useMemo(() => {
    return selectTasksByCategory(selectedCategory);
  }, [selectedCategory]);

  const tasks = useSelector(getTasksByCategory);
  const completedTasks = useSelector(selectCompletedTasks);
  const category = useSelector((state) => selectCategoryById(selectedCategory)(state));

  // Use useCallback for efficient event handlers
  const handleToggleCompletion = useCallback(
    (taskId) => {
      dispatch(toggleTaskCompletion(taskId));
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      dispatch(deleteTask(taskId));
    },
    [dispatch]
  );

  return (
    <div>
      <div className="task-list">
        <h2>
          📋 Tasks in {category?.name || 'All'}
          <span className="task-stats">{tasks.length} pending</span>
        </h2>

        {tasks.length > 0 ? (
          <div className="tasks">
            {tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  <div>
                    <span className="task-category">{category?.name}</span>
                    <span style={{ color: '#999', fontSize: '0.9em' }}>Progress: {task.progress}%</span>
                  </div>
                </div>
                <div className="task-status">
                  <button
                    className="btn btn-complete"
                    onClick={() => handleToggleCompletion(task.id)}
                  >
                    {task.completed ? '↩️ Undo' : '✓ Complete'}
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-message">
            <p>No pending tasks in this category. Great work! 🎉</p>
          </div>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="task-list">
          <div className="completed-section">
            <h3>✅ Completed Tasks ({completedTasks.length})</h3>
            <div className="tasks">
              {completedTasks
                .filter((task) => task.category === selectedCategory)
                .map((task) => (
                  <div key={task.id} className="task-item completed">
                    <div className="task-content">
                      <div className="task-title">{task.title}</div>
                      <div>
                        <span className="task-category">{category?.name}</span>
                      </div>
                    </div>
                    <div className="task-status">
                      <button
                        className="btn btn-complete"
                        onClick={() => handleToggleCompletion(task.id)}
                      >
                        ↩️ Undo
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
