import type { Recipe } from "../../types/recipe";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="flex flex-wrap gap-8 px-8 py-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}