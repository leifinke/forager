import { recipes } from "../data/recipes";
import RecipeGrid from "../components/recipe/RecipeGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex">
        <RecipeGrid recipes={recipes} />
      </div>
    </div>
  )
}