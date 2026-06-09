import { RecipeItem } from './model/RecipeItem';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

/**
 * Main application bootstrap
 */
class RecipeBookApp {
  private collection: RecipeCollection;
  private template: RecipeTemplate;

  constructor() {
    this.collection = new RecipeCollection();
    this.template = new RecipeTemplate(this.collection, '#recipesContainer');
    this.initialize();
  }

  /**
   * Initialize the application
   */
  private initialize(): void {
    this.setupEventListeners();
    this.template.render();
    this.updateRecipeCount();
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Form submission
    const form = document.getElementById('recipeForm') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => this.handleAddRecipe(e));
    }

    // Clear all button
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => this.handleClearAll());
    }

    // Template callbacks
    this.template.onDelete((id) => this.handleDeleteRecipe(id));
    this.template.onFavorite((id) => this.handleToggleFavorite(id));
  }

  /**
   * Handle adding a new recipe
   */
  private handleAddRecipe(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const titleInput = form.querySelector('#title') as HTMLInputElement;
    const ingredientsInput = form.querySelector('#ingredients') as HTMLTextAreaElement;
    const instructionsInput = form.querySelector('#instructions') as HTMLTextAreaElement;

    if (!titleInput.value || !ingredientsInput.value || !instructionsInput.value) {
      alert('Please fill in all fields');
      return;
    }

    const ingredients = ingredientsInput.value
      .split('\n')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);

    if (ingredients.length === 0) {
      alert('Please enter at least one ingredient');
      return;
    }

    const recipe = new RecipeItem(
      titleInput.value.trim(),
      ingredients,
      instructionsInput.value.trim()
    );

    this.collection.addRecipe(recipe);
    this.template.addRecipeAnimation(recipe);
    form.reset();
    this.updateRecipeCount();
  }

  /**
   * Handle deleting a recipe
   */
  private handleDeleteRecipe(id: string): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.collection.removeRecipe(id);
      this.template.removeRecipeAnimation(id);
      this.updateRecipeCount();
    }
  }

  /**
   * Handle toggling favorite status
   */
  private handleToggleFavorite(id: string): void {
    this.collection.toggleFavorite(id);
    this.template.updateFavoriteAnimation(id);
    this.template.render();
    this.updateRecipeCount();
  }

  /**
   * Handle clearing all recipes
   */
  private handleClearAll(): void {
    if (this.collection.getRecipeCount() === 0) {
      alert('No recipes to clear');
      return;
    }

    if (confirm('Are you sure you want to delete ALL recipes? This cannot be undone.')) {
      this.collection.clearAll();
      this.template.render();
      this.updateRecipeCount();
    }
  }

  /**
   * Update recipe count display
   */
  private updateRecipeCount(): void {
    const total = this.collection.getRecipeCount();
    const favorites = this.collection.getFavoriteCount();
    console.log(`📊 Total recipes: ${total}, Favorites: ${favorites}`);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RecipeBookApp();
});
