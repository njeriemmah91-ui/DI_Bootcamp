import { createSelector } from '@reduxjs/toolkit';

// Base selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectAllCategories = (state) => state.categories.categories;

// Task selectors with createSelector
export const selectTasksByCategory = (categoryId) =>
  createSelector([selectAllTasks], (tasks) =>
    tasks.filter((task) => task.category === categoryId && !task.completed)
  );

export const selectCompletedTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.completed)
);

export const selectCompletedTasksCount = createSelector(
  [selectCompletedTasks],
  (completedTasks) => completedTasks.length
);

export const selectTasksCount = createSelector([selectAllTasks], (tasks) => tasks.length);

// Category selectors
export const selectCategoryById = (categoryId) =>
  createSelector([selectAllCategories], (categories) =>
    categories.find((category) => category.id === categoryId)
  );

export const selectCategoriesWithTaskCount = createSelector(
  [selectAllCategories, selectAllTasks],
  (categories, tasks) =>
    categories.map((category) => ({
      ...category,
      taskCount: tasks.filter((task) => task.category === category.id && !task.completed)
        .length,
      completedCount: tasks.filter((task) => task.category === category.id && task.completed)
        .length,
    }))
);

// Progress selectors
export const selectAverageProgress = createSelector([selectAllTasks], (tasks) => {
  if (tasks.length === 0) return 0;
  const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
  return Math.round(totalProgress / tasks.length);
});

export const selectTasksByProgress = (minProgress, maxProgress) =>
  createSelector([selectAllTasks], (tasks) =>
    tasks.filter((task) => task.progress >= minProgress && task.progress <= maxProgress)
  );
