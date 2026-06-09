# 🎨 Redux Data Fetcher - Daily Challenge

A professional React + TypeScript + Redux application demonstrating generic data fetching with global state management, featuring a beautiful beige and indigo theme.

## 📚 Learning Objectives

✅ **TypeScript Generics** - Create reusable, type-safe components  
✅ **React Hooks** - Use `useEffect`, `useState`, and custom hooks  
✅ **Redux Toolkit** - Manage global state with slices and actions  
✅ **Async Data Fetching** - Handle API calls and side effects  
✅ **Error Handling** - Implement comprehensive error management  
✅ **Type Safety** - Full TypeScript integration with strict mode  

## 🎯 Features

🔄 **Generic Data Fetcher** - Reusable component for any data type  
📊 **Redux State Management** - Global state with RTK slices  
🎨 **Beige & Indigo Theme** - Beautiful gradient colors and animations  
⚡ **Multiple Data Sources** - Users, Posts, and Recipes APIs  
🔄 **Loading States** - Smooth spinner animations  
⚠️ **Error Handling** - Comprehensive error display  
📱 **Responsive Design** - Works on all screen sizes  
🎭 **Smooth Animations** - Fade-in, slide-in, and hover effects  

## 📁 Project Structure

```
src/
├── api/
│   └── api.ts                  # API functions for data fetching
├── components/
│   └── DataFetcher.tsx         # Generic data fetching component
├── features/
│   └── dataSlice.ts            # Redux slices for state management
├── store/
│   └── store.ts                # Redux store configuration
├── types/
│   └── types.ts                # TypeScript type definitions
├── styles/
│   └── DataFetcher.css         # Component-specific styles
├── App.tsx                     # Main app component
├── App.css                     # App styles (beige & indigo theme)
├── index.css                   # Global styles
└── main.tsx                    # Application entry point
```

## 🏗️ Architecture

### 1. **Types** (`src/types/types.ts`)

Defines the data structures:

```typescript
interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  query: string;
}
```

### 2. **API Layer** (`src/api/api.ts`)

Generic API functions for fetching data:

```typescript
// Generic fetch function
export async function fetchData<T>(url: string): Promise<T[]>

// Specific fetch functions
export async function fetchUsers(): Promise<User[]>
export async function fetchRecipesByIngredient(ingredient: string): Promise<Recipe[]>
export async function fetchPosts()
```

### 3. **Redux State** (`src/features/dataSlice.ts`)

Generic Redux slice factory:

```typescript
export const createDataSlice = <T,>(dataType: string) => {
  // Returns a slice with reducers:
  // - fetchStart()
  // - fetchSuccess(data)
  // - fetchError(error)
  // - setQuery(query)
  // - resetState()
}
```

### 4. **Redux Store** (`src/store/store.ts`)

Configured store with multiple slices:

```typescript
export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    recipes: recipesSlice.reducer,
    posts: postsSlice.reducer,
  },
});
```

### 5. **Generic Component** (`src/components/DataFetcher.tsx`)

Reusable component using TypeScript generics:

```typescript
interface DataFetcherProps<T> {
  dataType: 'users' | 'recipes' | 'posts';
  title: string;
  renderItem: (item: T) => React.ReactNode;
  fetchFunction: () => Promise<T[]>;
  emptyMessage?: string;
}

export function DataFetcher<T extends { id: number }>({ ... }): JSX.Element
```

### 6. **Main Application** (`src/App.tsx`)

Demonstrates usage of the generic component:

```typescript
<DataFetcher<User>
  dataType="users"
  title="👥 Users"
  renderItem={renderUser}
  fetchFunction={api.fetchUsers}
/>
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd week10/day2/dailychallenge
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## 📊 How It Works

### Data Flow

```
User Component
    ↓
DataFetcher Component (Generic)
    ↓
Redux Store (Global State)
    ↓
Dispatch Actions (fetchStart, fetchSuccess, fetchError)
    ↓
API Layer
    ↓
External APIs (JSONPlaceholder, Spoonacular)
```

### Component Flow

1. **Mount**: Component mounts and calls `useEffect`
2. **Fetch**: Dispatches `fetchStart()` action
3. **Request**: API call via `fetchFunction` prop
4. **Success**: Dispatches `fetchSuccess(data)` action
5. **Render**: Component renders data from Redux store
6. **Error**: On failure, dispatches `fetchError(message)` action

## 🎨 Theme Colors

The application uses a professional beige and indigo color palette:

- **Primary**: Indigo gradient (`#6c5b7b` → `#3a3f47`)
- **Background**: Beige gradient (`#f5f1e8` → `#e8e4d9`)
- **Text**: Dark brown (`#2c2817`)
- **Accents**: Gold and soft colors

## 🔄 Redux Flow Example

```typescript
// 1. Component mounts
useEffect(() => {
  // 2. Dispatch start action
  dispatch(actions.fetchStart());
  
  // 3. Call async API function
  const result = await fetchFunction();
  
  // 4. Dispatch success action with data
  dispatch(actions.fetchSuccess(result));
}, []);

// 5. Component selects state from Redux
const state = useSelector(stateSelector);

// 6. Render based on loading, error, data states
```

## 📱 API Endpoints

### Users (JSONPlaceholder)
- **URL**: `https://jsonplaceholder.typicode.com/users`
- **Returns**: Array of User objects

### Posts (JSONPlaceholder)
- **URL**: `https://jsonplaceholder.typicode.com/posts`
- **Returns**: Array of Post objects

### Recipes (Spoonacular)
- **URL**: `https://api.spoonacular.com/recipes/findByIngredients`
- **Params**: `ingredients`, `number`, `apiKey`
- **Returns**: Array of Recipe objects

## 🎭 Component States

### Loading State
- Shows animated spinner
- Displays "Loading..." message
- Data grid is hidden

### Error State
- Shows error icon (⚠️)
- Displays error message
- Data grid is hidden

### Empty State
- Shows empty message
- Suggests no data available
- Data grid is hidden

### Success State
- Shows data grid with items
- Displays item count in badge
- Each item animates in smoothly

## ✨ Key TypeScript Generics Usage

### 1. Generic API Function
```typescript
export async function fetchData<T>(url: string): Promise<T[]>
```

### 2. Generic Redux Slice
```typescript
const createDataSlice = <T,>(dataType: string) => { ... }
```

### 3. Generic Component
```typescript
export function DataFetcher<T extends { id: number }>({ ... })
```

### 4. Generic Props
```typescript
interface DataFetcherProps<T> {
  renderItem: (item: T) => React.ReactNode;
  fetchFunction: () => Promise<T[]>;
}
```

## 🔧 Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI library |
| TypeScript | 5.5 | Type safety |
| Redux Toolkit | 1.9 | State management |
| React-Redux | 8.1 | React bindings |
| Axios | 1.6 | HTTP client |
| Vite | 5.4 | Build tool |

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^8.1.3",
    "axios": "^1.6.0"
  }
}
```

## 🎓 Learning Outcomes

After completing this project, you'll understand:

1. **TypeScript Generics**: How to write generic functions and components
2. **React Hooks**: Using hooks for state and side effect management
3. **Redux Toolkit**: Modern Redux with slices and simplified actions
4. **Async Operations**: Handling async data fetching patterns
5. **Error Handling**: Comprehensive error management strategies
6. **Type Safety**: Benefits of TypeScript in large applications
7. **API Integration**: Working with multiple external APIs
8. **State Management**: Global state in React applications

## 🧪 Example Usage

### Using the DataFetcher with Different Data Types

```typescript
// For Users
<DataFetcher<User>
  dataType="users"
  title="👥 Users"
  renderItem={(user) => <div>{user.name}</div>}
  fetchFunction={api.fetchUsers}
/>

// For Posts
<DataFetcher<any>
  dataType="posts"
  title="📝 Posts"
  renderItem={(post) => <div>{post.title}</div>}
  fetchFunction={api.fetchPosts}
/>

// For Recipes
<DataFetcher<Recipe>
  dataType="recipes"
  title="🍳 Recipes"
  renderItem={(recipe) => <div>{recipe.title}</div>}
  fetchFunction={() => api.fetchRecipesByIngredient('chicken')}
/>
```

## 🐛 Troubleshooting

### API Errors
- Check internet connection
- Verify API endpoints are accessible
- Check API key validity (for Spoonacular)

### Redux State Not Updating
- Ensure Redux DevTools is installed
- Check Redux store configuration
- Verify actions are dispatched correctly

### TypeScript Errors
- Ensure types are properly imported
- Check generic constraints
- Verify interface implementations

## 📚 Additional Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Hooks Docs](https://react.dev/reference/react)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Axios Documentation](https://axios-http.com/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

---

**Happy coding!** 🚀✨
