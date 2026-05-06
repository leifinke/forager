import { Link } from "react-router";
import type { Recipe } from "../../types/recipe";
import { Clock, User } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.handle}`} className="flex flex-col">
      <div className="flex flex-col flex-1 max-w-xs rounded-lg overflow-hidden bg-white">
        <div className="aspect-square w-full h-42 overflow-hidden bg-gray-100">
        {recipe.image_url ? (
          <img src={`/images/${recipe.image_url}`} alt={recipe.name} className="w-full h-full object-cover object-center" />
        ) : (
          <p>Image not available.</p>
        )}
        </div>
        
        <div className="flex flex-col flex-1 p-5">
          <h2 className="mb-2 text-md font-bold">
            {recipe.name}
          </h2>
          <p className="mb-4 text-md line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center gap-2 mt-auto">
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