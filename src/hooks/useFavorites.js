import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("recipe_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("recipe_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isFav = prev.some((f) => f.idMeal === recipe.idMeal);
      if (isFav) {
        return prev.filter((f) => f.idMeal !== recipe.idMeal);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (id) => favorites.some((f) => f.idMeal === id);

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
