import { Link } from "react-router";
import type { Recipe } from "../../types/recipe";
import { Clock, User } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.handle}`}>
      <div className="max-w-sm overflow-hidden rounded-xl bg-white">
        <div className="flex h-48 overflow-hidden relative bg-gray-300 items-center justify-center">
        {recipe.image_url ? (
          <img src={recipe.image_url} alt={recipe.name} className="flex h-100 w-100" />
        ) : (
          <p>Image not available.</p>
        )}
        </div>
        
        <div className="p-5">
          <h2 className="mb-2 text-xl font-bold">
            {recipe.name}
          </h2>
          <p className="mb-4 text-md line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center pt-4 gap-2">
            <div className="flex items-center space-x-1 px-2 py-1 rounded-sm badge">
              <span><Clock size="14"/></span>
              <span className="text-xs font-medium">
                {recipe.cook_time + recipe.prep_time} mins
              </span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-sm badge">
              <span><User size="14"/></span>
              <span className="text-xs font-medium">
                {recipe.servings} Servings
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}