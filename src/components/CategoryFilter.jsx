import React from 'react';
import { ChefHat, Globe2, Tag } from 'lucide-react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="py-2 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <ChefHat className="h-5 w-5 text-primary-500" />
        <h3 className="font-bold text-gray-900 font-display">Browse by Category</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm ${
            activeCategory === 'All'
              ? 'bg-primary-500 text-white shadow-primary-100 ring-2 ring-primary-500 ring-offset-2'
              : 'bg-white text-gray-600 border border-gray-100 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600'
          }`}
        >
          All Recipes
        </button>
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            onClick={() => onCategoryChange(cat.strCategory)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm ${
              activeCategory === cat.strCategory
                ? 'bg-primary-500 text-white shadow-primary-100 ring-2 ring-primary-500 ring-offset-2'
                : 'bg-white text-gray-600 border border-gray-100 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
