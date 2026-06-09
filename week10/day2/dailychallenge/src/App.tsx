import React from 'react';
import { DataFetcher } from './components/DataFetcher';
import { User, Recipe } from './types/types';
import * as api from './api/api';
import './App.css';

/**
 * Main Application Component
 * Demonstrates usage of the generic DataFetcher component
 */

function App(): JSX.Element {
  // Render function for users
  const renderUser = (user: User): React.ReactNode => (
    <div className="user-card">
      <h3 className="item-title">{user.name}</h3>
      <p className="item-detail">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="item-detail">
        <strong>Email:</strong> {user.email}
      </p>
      {user.phone && (
        <p className="item-detail">
          <strong>Phone:</strong> {user.phone}
        </p>
      )}
      {user.website && (
        <p className="item-detail">
          <strong>Website:</strong> {user.website}
        </p>
      )}
    </div>
  );

  // Render function for recipes
  const renderRecipe = (recipe: Recipe): React.ReactNode => (
    <div className="recipe-card">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-content">
        <h3 className="item-title">{recipe.title}</h3>
        {recipe.usedIngredientCount !== undefined && (
          <p className="item-detail">
            🥘 Used: {recipe.usedIngredientCount} ingredients
          </p>
        )}
        {recipe.missedIngredientCount !== undefined && (
          <p className="item-detail">
            ❌ Missing: {recipe.missedIngredientCount} ingredients
          </p>
        )}
      </div>
    </div>
  );

  // Render function for posts
  const renderPost = (post: any): React.ReactNode => (
    <div className="post-card">
      <h3 className="item-title">{post.title}</h3>
      <p className="item-detail">{post.body}</p>
      <p className="item-meta">By User {post.userId}</p>
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Redux Data Fetcher</h1>
        <p>Generic data fetching component with TypeScript and Redux</p>
      </header>

      <main className="app-main">
        <div className="fetcher-container">
          <DataFetcher<User>
            dataType="users"
            title="👥 Users"
            renderItem={renderUser}
            fetchFunction={api.fetchUsers}
            emptyMessage="No users found"
          />
        </div>

        <div className="fetcher-container">
          <DataFetcher<any>
            dataType="posts"
            title="📝 Posts"
            renderItem={renderPost}
            fetchFunction={api.fetchPosts}
            emptyMessage="No posts found"
          />
        </div>

        <div className="fetcher-container">
          <DataFetcher<Recipe>
            dataType="recipes"
            title="🍳 Recipes (Chicken)"
            renderItem={renderRecipe}
            fetchFunction={() => api.fetchRecipesByIngredient('chicken', 6)}
            emptyMessage="No recipes found"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
