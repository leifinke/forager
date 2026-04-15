import { recipes } from "../data/recipes";
import RecipeGrid from "../components/recipe/RecipeGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <RecipeGrid recipes={recipes} />
      </div>
    </div>
  )
}