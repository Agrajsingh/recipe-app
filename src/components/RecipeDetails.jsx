import { X, Youtube, ChevronRight, ListChecks, Info, Globe2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeDetails = ({ recipe, isOpen, onClose }) => {
  if (!recipe) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[32px] shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-gray-900 shadow-sm z-50 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Column: Image & Basic Info */}
            <div className="md:w-5/12 relative">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 md:h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold text-white font-display mb-2">{recipe.strMeal}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase">
                    {recipe.strCategory}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm text-[10px] font-bold uppercase">
                    {recipe.strArea}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:w-7/12 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-50/50">
              <div className="flex flex-col space-y-8">
                {/* Ingredients */}
                <section>
                  <div className="flex items-center space-x-2 mb-4">
                    <ListChecks className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-bold text-gray-900 font-display">Ingredients</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ingredients.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-primary-400" />
                        <div className="text-sm">
                          <span className="font-bold text-gray-900">{item.measure}</span>
                          <span className="text-gray-600 ml-1">{item.ingredient}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Instructions */}
                <section>
                  <div className="flex items-center space-x-2 mb-4">
                    <Info className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-bold text-gray-900 font-display">Instructions</h3>
                  </div>
                  <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    {recipe.strInstructions}
                  </div>
                </section>

                {/* Links */}
                {(recipe.strYoutube || recipe.strSource) && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {recipe.strYoutube && (
                      <a
                        href={recipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors shadow-sm"
                      >
                        <Youtube className="h-5 w-5" />
                        <span>Watch on YouTube</span>
                      </a>
                    )}
                    {recipe.strSource && (
                      <a
                        href={recipe.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-primary-50 text-primary-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-primary-100 transition-colors shadow-sm"
                      >
                        <Globe2 className="h-5 w-5" />
                        <span>View Original Source</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecipeDetails;
