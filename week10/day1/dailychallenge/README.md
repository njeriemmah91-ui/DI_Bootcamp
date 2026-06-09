# Book List Daily Challenge

A TypeScript and React application demonstrating generic components, type safety, and state management.

## Project Overview

This project builds a **Book List application** that showcases:

- **TypeScript Generics**: A reusable `List` component that works with any data type
- **React Hooks**: Using `useState` to manage book state
- **Type Safety**: Proper type definitions for all data structures
- **Modern React**: Functional components with hooks and proper event handling

## Features

✅ **View Books**: Display a list of books with title and author  
✅ **Add Books**: Dynamically add new books with unique IDs  
✅ **Delete Books**: Remove books from the list  
✅ **Generic List Component**: Reusable component that can render any item type  
✅ **Responsive Design**: Beautiful UI that works on all screen sizes  
✅ **Type Safe**: Full TypeScript support with strict mode enabled  

## Project Structure

```
dailychallenge/
├── index.html           # Entry HTML file
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── src/
    ├── main.tsx         # Application entry point
    ├── App.tsx          # BookApp component (main app)
    ├── App.css          # Styles
    ├── types.ts         # Book type definition
    └── components/
        └── List.tsx     # Generic List component
```

## Key Components

### `Book` Type (`src/types.ts`)
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
}
```

### Generic `List` Component (`src/components/List.tsx`)
A reusable component that accepts:
- `items`: Array of items to display
- `renderItem`: Function to render each item
- `emptyMessage`: Message when list is empty

### `BookApp` Component (`src/App.tsx`)
Main application component that:
- Manages book state with `useState`
- Provides functions to add and remove books
- Uses the generic `List` component to display books

## How to Run

1. **Navigate to the project directory**:
   ```bash
   cd week10/day1/dailychallenge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Visit `http://localhost:5173`

## How to Build

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Learning Outcomes

After completing this project, you'll understand:

1. **TypeScript Generics**: How to write code that works with multiple types
2. **React Composition**: Building reusable, composable components
3. **State Management**: Using React hooks to manage application state
4. **Type Safety**: How TypeScript prevents runtime errors
5. **React Best Practices**: Proper event handling, key management, and component organization

## Example Usage

The `List` component is generic and can be used with any data type:

```typescript
// Works with books
<List<Book>
  items={books}
  renderItem={(book) => <div>{book.title}</div>}
/>

// Could work with movies
<List<Movie>
  items={movies}
  renderItem={(movie) => <div>{movie.name}</div>}
/>
```

## Technologies Used

- **React 18.3**: UI library
- **TypeScript 5.5**: Type-safe JavaScript
- **Vite 5.4**: Build tool and dev server
- **CSS3**: Styling with gradients and transitions

Enjoy building your Book List application! 📚
