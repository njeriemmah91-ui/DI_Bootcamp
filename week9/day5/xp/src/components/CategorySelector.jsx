import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesWithTaskCount } from '../redux/selectors';

function CategorySelector({ selectedCategory, onSelectCategory }) {
  const categories = useSelector(selectCategoriesWithTaskCount);

  return (
    <div className="category-selector">
      <h2>📂 Categories</h2>
      <div className="categories-list">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span>{category.name}</span>
            <span className="category-count">
              {category.taskCount} task{category.taskCount !== 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
