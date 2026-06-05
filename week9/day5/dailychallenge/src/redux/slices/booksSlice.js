import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    { id: 1, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'horror' },
    { id: 2, title: 'It', author: 'Stephen King', genre: 'horror' },
    { id: 3, title: 'The Shining', author: 'Stephen King', genre: 'horror' },
    { id: 4, title: 'Dracula', author: 'Bram Stoker', genre: 'horror' },
    { id: 5, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'fantasy' },
    { id: 6, title: 'A Song of Ice and Fire', author: 'George R.R. Martin', genre: 'fantasy' },
    { id: 7, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'fantasy' },
    { id: 8, title: 'Dune', author: 'Frank Herbert', genre: 'science_fiction' },
    { id: 9, title: '1984', author: 'George Orwell', genre: 'science_fiction' },
    { id: 10, title: 'Foundation', author: 'Isaac Asimov', genre: 'science_fiction' },
    { id: 11, title: 'Neuromancer', author: 'William Gibson', genre: 'science_fiction' },
    { id: 12, title: 'The Silmarillion', author: 'J.R.R. Tolkien', genre: 'fantasy' },
  ],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
});

export default booksSlice.reducer;
