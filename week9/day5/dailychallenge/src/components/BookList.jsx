import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
  selectBooksByGenre,
} from '../redux/selectors';

function BookList({ selectedGenre }) {
  // Using memoized selector based on genre
  const getBooksByGenre = useMemo(() => {
    return selectBooksByGenre(selectedGenre);
  }, [selectedGenre]);

  const books = useSelector(getBooksByGenre);

  const getGenreDisplayName = (genre) => {
    switch (genre) {
      case 'horror':
        return '😱 Horror Books';
      case 'fantasy':
        return '⚔️ Fantasy Books';
      case 'science_fiction':
        return '🚀 Science Fiction Books';
      case 'all':
        return '📚 All Books';
      default:
        return 'Books';
    }
  };

  return (
    <div className="book-list">
      <h2>{getGenreDisplayName(selectedGenre)}</h2>
      
      {books.length > 0 ? (
        <div className="books-container">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>
                <span className="label">Author:</span> {book.author}
              </p>
              <p>
                <span className="label">ID:</span> {book.id}
              </p>
              <span className="genre-badge">
                {book.genre.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <p>No books found for this genre. Try selecting a different genre!</p>
        </div>
      )}
    </div>
  );
}

export default BookList;
