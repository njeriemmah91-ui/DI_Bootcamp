import { createSelector } from '@reduxjs/toolkit';

// Base selector to get all books
export const selectAllBooks = (state) => state.books.books;

// Selector to get all books (used for filtering)
export const selectBooks = createSelector([selectAllBooks], (books) => books);

// Selector to filter horror books
export const selectHorrorBooks = createSelector(
  [selectAllBooks],
  (books) => books.filter((book) => book.genre === 'horror')
);

// Selector to filter fantasy books
export const selectFantasyBooks = createSelector(
  [selectAllBooks],
  (books) => books.filter((book) => book.genre === 'fantasy')
);

// Selector to filter science fiction books
export const selectScienceFictionBooks = createSelector(
  [selectAllBooks],
  (books) => books.filter((book) => book.genre === 'science_fiction')
);

// Dynamic selector that filters books by genre
export const selectBooksByGenre = (genre) =>
  createSelector([selectAllBooks], (books) => {
    if (genre === 'all') return books;
    return books.filter((book) => book.genre === genre);
  });
