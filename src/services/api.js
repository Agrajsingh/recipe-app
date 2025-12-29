import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const api = axios.create({
  baseURL: BASE_URL,
});

export const recipeService = {
  // Search for recipes by name
  searchRecipes: async (query) => {
    const response = await api.get(`/search.php?s=${query}`);
    return response.data.meals || [];
  },

  // Get random recipes for featured section
  getRandomRecipes: async () => {
    const response = await api.get("/random.php");
    return response.data.meals || [];
  },

  // Get recipe by ID
  getRecipeById: async (id) => {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get("/categories.php");
    return response.data.categories || [];
  },

  // Filter recipes by category
  filterByCategory: async (category) => {
    const response = await api.get(`/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  // Filter recipes by ingredient
  filterByIngredient: async (ingredient) => {
    const response = await api.get(`/filter.php?i=${ingredient}`);
    return response.data.meals || [];
  },

  // List all ingredients
  getIngredients: async () => {
    const response = await api.get("/list.php?i=list");
    return response.data.meals || [];
  },

  // Filter recipes by area (meal type/region)
  filterByArea: async (area) => {
    const response = await api.get(`/filter.php?a=${area}`);
    return response.data.meals || [];
  },

  // List all areas
  getAreas: async () => {
    const response = await api.get("/list.php?a=list");
    return response.data.meals || [];
  },
};

export default api;
