import axios, { AxiosError } from 'axios';
import { Recipe, User } from '../types/types';

/**
 * Generic API fetcher function
 * Fetches data from various APIs
 */

// JSONPlaceholder API for users
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

// Spoonacular API for recipes (you can add your own API key)
const RECIPES_API = 'https://api.spoonacular.com/recipes/findByIngredients';
const RECIPES_API_KEY = 'a6c8a84da9e84d7baf14a7d93c17f14e'; // Demo key - replace with your own

/**
 * Fetch users from JSONPlaceholder API
 */
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(USERS_API);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch users: ${axiosError.message}`);
  }
}

/**
 * Generic fetch function for any data type
 */
export async function fetchData<T>(url: string): Promise<T[]> {
  try {
    const response = await axios.get<T[]>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch data: ${axiosError.message}`);
  }
}

/**
 * Fetch recipes by ingredient
 */
export async function fetchRecipesByIngredient(
  ingredient: string,
  number: number = 10
): Promise<Recipe[]> {
  try {
    const response = await axios.get<Recipe[]>(RECIPES_API, {
      params: {
        ingredients: ingredient,
        number,
        apiKey: RECIPES_API_KEY,
        addRecipeInformation: true,
        fillIngredients: true,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch recipes: ${axiosError.message}`);
  }
}

/**
 * Fetch posts from JSONPlaceholder
 */
export async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch posts: ${axiosError.message}`);
  }
}
