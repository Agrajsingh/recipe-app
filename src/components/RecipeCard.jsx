import React from 'react';
import { Heart, Clock, Utensils, ChevronRight } from 'lucide-react';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onClick(recipe.idMeal)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all transform hover:scale-110 active:scale-95 z-10"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-accent-500 text-accent-500' : 'text-gray-400'}`} 
          />
        </button>

        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-primary-700 shadow-sm">
              {recipe.strCategory}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-2 font-display">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center">
              <Utensils className="h-3.5 w-3.5 mr-1 text-primary-500" />
              {recipe.strArea || 'Global'}
            </span>
          </div>
          <div className="flex items-center text-primary-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
            Details
            <ChevronRight className="h-4 w-4 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
