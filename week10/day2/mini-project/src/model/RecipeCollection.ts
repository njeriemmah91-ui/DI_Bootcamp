import { RecipeItem } from './RecipeItem';

/**
 * RecipeCollection class manages all recipes
 */
export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private readonly storageKey = 'recipes_db';

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Add a new recipe to the collection
   */
  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToLocalStorage();
  }

  /**
   * Remove a recipe by ID
   */
  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveToLocalStorage();
  }

  /**
   * Get a recipe by ID
   */
  getRecipe(id: string): RecipeItem | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  /**
   * Get all recipes
   */
  getAllRecipes(): RecipeItem[] {
    return [...this.recipes];
  }

  /**
   * Get favorite recipes
   */
  getFavoriteRecipes(): RecipeItem[] {
    return this.recipes.filter(recipe => recipe.isFavorite);
  }

  /**
   * Toggle favorite status of a recipe
   */
  toggleFavorite(id: string): void {
    const recipe = this.getRecipe(id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveToLocalStorage();
    }
  }

  /**
   * Clear all recipes
   */
  clearAll(): void {
    this.recipes = [];
    this.saveToLocalStorage();
  }

  /**
   * Get the total number of recipes
   */
  getRecipeCount(): number {
    return this.recipes.length;
  }

  /**
   * Get the number of favorite recipes
   */
  getFavoriteCount(): number {
    return this.recipes.filter(recipe => recipe.isFavorite).length;
  }

  /**
   * Save all recipes to localStorage
   */
  private saveToLocalStorage(): void {
    const data = this.recipes.map(recipe => recipe.toJSON());
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  /**
   * Load all recipes from localStorage
   */
  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.recipes = parsed.map((item: any) => RecipeItem.fromJSON(item));
      } catch (error) {
        console.error('Error loading recipes from localStorage:', error);
        this.recipes = [];
      }
    }
  }
}
