console.log("=== Library System ===");

// ======================
// Interface: Book
// ======================
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // optional property
}


// ======================
// Class: Library
// ======================
class Library {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | undefined {
    return this.books.find(book => book.isbn === isbn);
  }

  // helper method for child class
  protected getAllBooks(): Book[] {
    return this.books;
  }
}


// ======================
// Class: DigitalLibrary
// ======================
class DigitalLibrary extends Library {
  readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
    return this.getAllBooks().map(book => book.title);
  }
}


// ======================
// Testing the system
// ======================

// Create library
const myLibrary = new DigitalLibrary("www.mybooks.com");

// Add books
myLibrary.addBook({
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  isbn: "1111",
  publishedYear: 1937,
  genre: "Fantasy"
});

myLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "2222",
  publishedYear: 1949
});

myLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "3333",
  publishedYear: 2008,
  genre: "Programming"
});

// Get book details
console.log(myLibrary.getBookDetails("2222"));

// List all book titles
console.log(myLibrary.listBooks());

// Website (readonly)
console.log("Library Website:", myLibrary.website);