import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeDetails from '../components/RecipeDetails';
import { recipeService } from '../services/api';
import { HeartOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = ({ favorites, toggleFavorite, isFavorite }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div className="space-y-8 min-h-screen pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 font-display mb-2">My Favorites</h1>
          <p className="text-gray-500">Your curated collection of must-try recipes.</p>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
        </div>
      )}

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="bg-primary-50 p-6 rounded-full mb-6">
            <HeartOff className="h-12 w-12 text-primary-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500 max-w-sm mb-8">
            Start exploring and save the recipes you love to see them here later!
          </p>
          <Link 
            to="/" 
            className="bg-primary-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-200 hover:-translate-y-0.5"
          >
            Explore Recipes
          </Link>
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

export default Favorites;
