import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import useFavorites from './hooks/useFavorites'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50/50">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          favoritesCount={favorites.length} 
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  searchTerm={searchTerm} 
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              } 
            />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} RecipeApp. Crafted for food lovers.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
