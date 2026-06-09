import { useState } from 'react';
import { List } from './components/List';
import { Book } from './types';
import './App.css';

export function BookApp(): JSX.Element {
  // State to manage the list of books
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
  ]);

  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  /**
   * Add a new book to the list
   * Generates a unique ID based on the current max ID
   */
  const addBook = (): void => {
    if (title.trim() && author.trim()) {
      const newBook: Book = {
        id: Math.max(...books.map(b => b.id), 0) + 1,
        title: title.trim(),
        author: author.trim(),
      };
      setBooks([...books, newBook]);
      setTitle('');
      setAuthor('');
    }
  };

  /**
   * Remove a book from the list by ID
   */
  const removeBook = (id: number): void => {
    setBooks(books.filter(book => book.id !== id));
  };

  /**
   * Render function to display each book item
   */
  const renderBook = (book: Book): JSX.Element => (
    <div className="book-item">
      <div className="book-content">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
      </div>
      <button 
        className="delete-btn"
        onClick={() => removeBook(book.id)}
        aria-label={`Delete ${book.title}`}
      >
        ✕
      </button>
    </div>
  );

  return (
    <div className="container">
      <header className="header">
        <h1>📚 Book List</h1>
        <p>Manage your favorite books with this React and TypeScript application</p>
      </header>

      <section className="add-book-section">
        <h2>Add a New Book</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') addBook();
            }}
            className="input"
          />
          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') addBook();
            }}
            className="input"
          />
          <button onClick={addBook} className="add-btn">
            Add Book
          </button>
        </div>
      </section>

      <section className="books-section">
        <h2>Your Books ({books.length})</h2>
        <List<Book>
          items={books}
          renderItem={renderBook}
          emptyMessage="No books yet. Add one to get started!"
        />
      </section>
    </div>
  );
}

export default BookApp;
