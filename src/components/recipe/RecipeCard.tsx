import type { Recipe } from "../../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md ">
      <div className="p-5">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          {recipe.name}
        </h2>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex items-center justify-between border-t pt-4 text-gray-500">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium">
              {recipe.cook_time + recipe.prep_time} mins
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium">
              {recipe.servings} Servings
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}