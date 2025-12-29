import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import RecipeDetails from '../components/RecipeDetails';
import { Loader2, SearchX } from 'lucide-react';

const Home = ({ searchTerm, favorites, toggleFavorite, isFavorite }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('Fetching categories...');
        const cats = await recipeService.getCategories();
        console.log('Categories fetched:', cats);
        setCategories(cats);
        
        console.log('Fetching initial recipes...');
        const initialRecipes = await recipeService.searchRecipes('Chicken');
        console.log('Initial recipes fetched:', initialRecipes);
        setRecipes(initialRecipes);
      } catch (error) {
        console.error('Error initializing home:', error);
        setError('Failed to load recipes. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchTerm && activeCategory === 'All') return;
      setLoading(true);
      setError(null);
      try {
        let results = [];
        console.log(`Searching for: "${searchTerm}" in category: "${activeCategory}"`);
        
        if (searchTerm) {
          results = await recipeService.searchRecipes(searchTerm);
        } else if (activeCategory !== 'All') {
          results = await recipeService.filterByCategory(activeCategory);
        } else {
          results = await recipeService.searchRecipes('');
        }
        
        console.log('Search results:', results);
        setRecipes(results);
      } catch (error) {
        console.error('Error searching:', error);
        setError('Failed to search recipes. Please try again.');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, activeCategory]);

  const handleCategoryChange = async (cat) => {
    setActiveCategory(cat);
  };

  const handleCardClick = async (id) => {
    setLoading(true);
    try {
      const details = await recipeService.getRecipeById(id);
      setSelectedRecipe(details);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 min-h-screen">
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-primary-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Fetching delicious recipes...</p>
        </div>
      ) : recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={toggleFavorite}
              onClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 p-6 rounded-3xl mb-4">
            <SearchX className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500 max-w-xs">
            We couldn't find anything matching your search. Try another keyword or category!
          </p>
        </div>
      )}

      <RecipeDetails 
        recipe={selectedRecipe} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
