import type { Recipe } from "../../types/recipe";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-2 sm:gap-8 sm:p-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}