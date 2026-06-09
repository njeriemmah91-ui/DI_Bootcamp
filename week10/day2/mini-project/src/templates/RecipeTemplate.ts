import { RecipeItem } from '../model/RecipeItem';
import { RecipeCollection } from '../model/RecipeCollection';

/**
 * RecipeTemplate class handles DOM rendering
 */
export class RecipeTemplate {
  private collection: RecipeCollection;
  private container: HTMLElement;
  private onDeleteCallback?: (id: string) => void;
  private onFavoriteCallback?: (id: string) => void;

  constructor(
    collection: RecipeCollection,
    containerSelector: string
  ) {
    this.collection = collection;
    const container = document.querySelector(containerSelector);
    if (!container) {
      throw new Error(`Container ${containerSelector} not found`);
    }
    this.container = container as HTMLElement;
  }

  /**
   * Set callback for delete action
   */
  onDelete(callback: (id: string) => void): void {
    this.onDeleteCallback = callback;
  }

  /**
   * Set callback for favorite action
   */
  onFavorite(callback: (id: string) => void): void {
    this.onFavoriteCallback = callback;
  }

  /**
   * Render all recipes
   */
  render(): void {
    const recipes = this.collection.getAllRecipes();
    this.container.innerHTML = '';

    if (recipes.length === 0) {
      this.container.innerHTML = '<p class="empty-message">No recipes yet. Add one to get started!</p>';
      return;
    }

    recipes.forEach(recipe => {
      const card = this.createRecipeCard(recipe);
      this.container.appendChild(card);
    });
  }

  /**
   * Create a recipe card element
   */
  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('div');
    card.className = `recipe-card ${recipe.isFavorite ? 'favorite' : ''}`;
    card.id = `recipe-${recipe.id}`;

    const ingredientsList = recipe.ingredients
      .map(ing => `<li>${this.escapeHtml(ing.trim())}</li>`)
      .join('');

    card.innerHTML = `
      <div class="recipe-card-header">
        <h3>${this.escapeHtml(recipe.title)}</h3>
        <div class="recipe-actions">
          <button class="btn-favorite" data-id="${recipe.id}" title="Toggle favorite">
            ${recipe.isFavorite ? '❤️' : '🤍'}
          </button>
          <button class="btn-delete" data-id="${recipe.id}" title="Delete recipe">
            🗑️
          </button>
        </div>
      </div>

      <div class="recipe-content">
        <details class="ingredients-section">
          <summary>📝 Ingredients</summary>
          <ul class="ingredients-list">
            ${ingredientsList}
          </ul>
        </details>

        <details class="instructions-section" open>
          <summary>👨‍🍳 Instructions</summary>
          <p class="instructions-text">${this.escapeHtml(recipe.instructions).replace(/\n/g, '<br>')}</p>
        </details>
      </div>
    `;

    // Add event listeners
    const favoriteBtn = card.querySelector('.btn-favorite');
    const deleteBtn = card.querySelector('.btn-delete');

    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.onFavoriteCallback) {
          this.onFavoriteCallback(recipe.id);
        }
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.onDeleteCallback) {
          this.onDeleteCallback(recipe.id);
        }
      });
    }

    return card;
  }

  /**
   * Escape HTML special characters to prevent XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Add a new recipe card animation
   */
  addRecipeAnimation(recipe: RecipeItem): void {
    const card = this.createRecipeCard(recipe);
    card.classList.add('new-recipe');
    this.container.appendChild(card);

    // Trigger animation
    setTimeout(() => {
      card.classList.remove('new-recipe');
    }, 10);
  }

  /**
   * Remove a recipe card with animation
   */
  removeRecipeAnimation(id: string): void {
    const card = document.getElementById(`recipe-${id}`);
    if (card) {
      card.classList.add('remove-recipe');
      setTimeout(() => {
        card.remove();
        if (this.container.children.length === 0) {
          this.container.innerHTML = '<p class="empty-message">No recipes yet. Add one to get started!</p>';
        }
      }, 300);
    }
  }

  /**
   * Update favorite status animation
   */
  updateFavoriteAnimation(id: string): void {
    const card = document.getElementById(`recipe-${id}`);
    if (card) {
      card.classList.add('favorite-pulse');
      setTimeout(() => {
        card.classList.remove('favorite-pulse');
      }, 600);
    }
  }

  /**
   * Get the count of recipes
   */
  getRecipeCount(): number {
    return this.collection.getRecipeCount();
  }
}
