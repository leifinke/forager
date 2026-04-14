import { useParams } from "react-router";
import { recipes } from "../data/recipes";

export default function RecipeDetailPage() {
  const { handle } = useParams();

  const recipe = recipes.find(recipe => recipe.handle === handle);

  if (!recipe) {
    return <h1 className="text-2xl font-bold">Recipe Not Found.</h1>;
  }

  return <h1 className="text-2xl font-bold">Recipe: {recipe.name} </h1>;
}