import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slices/tasksSlice';
import { selectAllCategories } from '../redux/selectors';

function AddTaskForm({ selectedCategory }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(selectedCategory);
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (title.trim()) {
        dispatch(addTask({ title, category: parseInt(category) }));
        setTitle('');
        setCategory(selectedCategory);
      }
    },
    [title, category, dispatch, selectedCategory]
  );

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      <h3>➕ Add New Task</h3>
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-add">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
