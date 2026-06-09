# 🍳 Recipe Book Application - Mini Project

A TypeScript-based recipe management application with a beautiful pink and lavender theme. Users can add, delete, and mark recipes as favorites, with all data persisted to localStorage.

## 📚 Project Overview

This mini-project teaches:

- **TypeScript Basics**: Classes, interfaces, and type annotations
- **Data Management**: Working with TypeScript classes and localStorage persistence
- **DOM Manipulation**: Creating and updating recipe cards dynamically
- **Event Handling**: Managing user interactions for adding/deleting/favoriting recipes
- **Project Structure**: Organizing a Vite + TypeScript project

## 🎨 Features

✅ **Add Recipes** - Create new recipes with title, ingredients, and instructions  
✅ **View Recipes** - Display recipes in beautiful card format  
✅ **Delete Recipes** - Remove recipes from your collection  
✅ **Favorite Toggle** - Mark recipes as favorites with visual feedback  
✅ **localStorage Persistence** - Recipes are saved and persist across sessions  
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
✅ **Pink & Lavender Theme** - Beautiful gradient colors and smooth animations  
✅ **Unique IDs** - Each recipe gets a unique UUID using the uuid library  

## 📁 Project Structure

```
mini-project/
├── index.html              # Main HTML file with structure
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── README.md               # This file
└── src/
    ├── style.css           # Pink & lavender theme styles
    ├── main.ts             # Application bootstrap and event handling
    ├── model/
    │   ├── RecipeItem.ts   # Single recipe class
    │   └── RecipeCollection.ts  # Collection manager class
    └── templates/
        └── RecipeTemplate.ts  # DOM rendering and card creation
```

## 🏗️ Architecture

### `RecipeItem.ts`
Represents a single recipe with:
- `id`: Unique identifier (UUID)
- `title`: Recipe name
- `ingredients`: Array of ingredient strings
- `instructions`: Cooking instructions
- `isFavorite`: Boolean flag for favorites
- `createdAt`: Timestamp of creation

Methods:
- `toggleFavorite()`: Toggle favorite status
- `toJSON()`: Serialize for storage
- `fromJSON()`: Deserialize from storage

### `RecipeCollection.ts`
Manages all recipes with methods for:
- `addRecipe()`: Add new recipe
- `removeRecipe()`: Delete recipe by ID
- `getRecipe()`: Fetch recipe by ID
- `getAllRecipes()`: Get all recipes
- `getFavoriteRecipes()`: Get favorite recipes only
- `toggleFavorite()`: Toggle favorite status
- `clearAll()`: Delete all recipes
- `saveToLocalStorage()`: Persist data
- `loadFromLocalStorage()`: Restore data

### `RecipeTemplate.ts`
Handles DOM rendering with:
- `render()`: Render all recipes
- `createRecipeCard()`: Generate recipe card HTML
- `addRecipeAnimation()`: Animate new recipe addition
- `removeRecipeAnimation()`: Animate recipe deletion
- `updateFavoriteAnimation()`: Animate favorite toggle

### `main.ts`
Bootstrap class that:
- Initializes the app
- Sets up event listeners
- Handles form submission
- Manages delete/favorite actions
- Updates recipe count

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd week10/day2/mini-project
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## 📝 Usage

### Adding a Recipe

1. Fill in the form on the left side with:
   - Recipe title (e.g., "Chocolate Cake")
   - Ingredients (one per line)
   - Instructions (detailed steps)

2. Click "Add Recipe" button

3. Recipe appears in the main area with smooth animation

### Managing Recipes

**Favorite a Recipe**: Click the ❤️ heart icon to toggle favorite status

**Delete a Recipe**: Click the 🗑️ trash icon and confirm deletion

**Clear All Recipes**: Click "Clear All Recipes" button (with confirmation)

### Expanding/Collapsing Recipe Details

- Click "Ingredients" to show/hide the ingredient list
- Click "Instructions" to show/hide the cooking steps

## 💾 Data Persistence

All recipes are automatically saved to `localStorage` under the key `recipes_db`. This means:

- Recipes persist across browser sessions
- Refreshing the page keeps your recipes
- Closing and reopening the browser preserves data
- Clear browser data to reset recipes

## 🎨 Theme Colors

The application uses a beautiful pink and lavender color palette:

- **Primary Gradient**: Lavender → Purple (`#d8a5e0` → `#e8b0ed`)
- **Secondary Gradient**: Pink variations (`#ffe6f0`, `#ff9eb0`)
- **Accent Gradient**: Soft peach (`#fff0e6`)
- **Cards**: Soft gradients with smooth shadows

## 📱 Responsive Design

- **Desktop**: 2-column layout with sticky form panel
- **Tablet**: Adjusted grid with flexible layout
- **Mobile**: Single column, optimized buttons and spacing
- **Very Small**: Adjusted typography and spacing

## 🔧 Technologies Used

- **TypeScript 5.5**: Type-safe JavaScript
- **Vite 5.4**: Ultra-fast build tool
- **UUID 9.0**: Unique ID generation
- **Vanilla HTML/CSS**: No framework dependencies
- **localStorage API**: Browser storage

## 📦 Dependencies

```json
{
  "dependencies": {
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "vite": "^5.4.2"
  }
}
```

## ✨ Key Features Explained

### Type Safety
All code uses TypeScript types to catch errors at compile time:
```typescript
addRecipe(recipe: RecipeItem): void
```

### Animations
Smooth CSS animations for:
- Card slide-in on add
- Scale pulse on favorite toggle
- Fade out on delete
- Hover effects

### UUID Generation
Each recipe gets a unique ID using the `uuid` library:
```typescript
id: string = uuidv4()
```

### HTML Escaping
Prevents XSS attacks by escaping user input:
```typescript
private escapeHtml(text: string): string
```

### Event Delegation
Efficient event handling with callback patterns:
```typescript
this.template.onDelete((id) => this.handleDeleteRecipe(id));
```

## 🎓 Learning Outcomes

After completing this project, you'll understand:

1. **TypeScript Classes**: How to structure code with classes and interfaces
2. **Data Persistence**: Working with localStorage and JSON serialization
3. **DOM Manipulation**: Creating, updating, and animating elements
4. **Event Handling**: Form submissions, clicks, and custom callbacks
5. **Project Organization**: Separating concerns with model, template, and main files
6. **Type Safety**: Benefits of TypeScript over plain JavaScript
7. **CSS Animations**: Creating smooth, professional UI transitions

## 🐛 Troubleshooting

### Recipes not persisting?
- Check if localStorage is enabled in browser
- Open DevTools → Application → localStorage
- Look for key `recipes_db`

### Styles not loading?
- Make sure you're in the project root directory
- Run `npm run dev` to start the dev server
- Clear browser cache

### TypeScript errors?
- Run `npm install` to ensure dependencies are installed
- Check that `tsconfig.json` is properly configured

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [UUID npm package](https://www.npmjs.com/package/uuid)

---

Enjoy building your Recipe Book! 🍳✨
