import { v4 as uuidv4 } from 'uuid';

/**
 * RecipeItem class represents a single recipe
 */
export class RecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
  createdAt: number;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    id: string = uuidv4()
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = false;
    this.createdAt = Date.now();
  }

  /**
   * Toggle the favorite status of the recipe
   */
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  /**
   * Convert recipe to JSON for storage
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      ingredients: this.ingredients,
      instructions: this.instructions,
      isFavorite: this.isFavorite,
      createdAt: this.createdAt,
    };
  }

  /**
   * Create RecipeItem from JSON
   */
  static fromJSON(data: any): RecipeItem {
    const recipe = new RecipeItem(
      data.title,
      data.ingredients,
      data.instructions,
      data.id
    );
    recipe.isFavorite = data.isFavorite;
    recipe.createdAt = data.createdAt;
    return recipe;
  }
}
