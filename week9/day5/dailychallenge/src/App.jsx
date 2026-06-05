import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = ['all', 'horror', 'fantasy', 'science_fiction'];

  return (
    <Provider store={store}>
      <div className="app">
        <h1>📚 Book Inventory Selector</h1>
        <p>Redux Performance Optimizations - Using createSelector</p>

        <div className="genre-selector">
          <h2>Select Genre:</h2>
          <div className="button-group">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <BookList selectedGenre={selectedGenre} />
      </div>
    </Provider>
  );
}

export default App;
