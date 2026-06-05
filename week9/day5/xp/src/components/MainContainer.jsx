import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

function MainContainer() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <div className="container">
      <CategorySelector selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <div className="task-list-container">
        <TaskList selectedCategory={selectedCategory} />
        <AddTaskForm selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default MainContainer;
