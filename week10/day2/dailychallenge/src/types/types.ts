/**
 * TypeScript types and interfaces for the data fetching application
 */

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: Ingredient[];
  usedIngredients?: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
}

export interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  query: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  error?: string;
}

export type DataType = 'recipes' | 'users' | 'posts';
