import { useParams, Link } from "react-router";
import { recipes } from "../data/recipes";
import { ChevronLeft, Clock, User } from "lucide-react";

export default function RecipeDetailPage() {
  const { handle } = useParams();

  const recipe = recipes.find(recipe => recipe.handle === handle);

  if (!recipe) {
    return <h1 className="text-2xl font-bold">Recipe Not Found.</h1>;
  }

  return (
    <div>
      <Link to="/" className="flex absolute mt-2 ml-2">
        <span className="bg-white rounded-full shadow-sm p-2"><ChevronLeft /></span>
      </Link>
      {recipe.image_url &&
        <div className="flex h-64 overflow-hidden aspect-[4/5] w-full">
          <img src={`/images/${recipe.image_url}`} alt={recipe.name} className="w-full h-full object-cover object-center" />
        </div>
      }
      <div className="flex flex-col my-6">
        <h1 className="text-2xl font-bold mb-2">{recipe.name} </h1>
        <p className="mb-2">{recipe.description}</p>
      </div>
      <div className="flex items-center pt-4 gap-2">
        <div className="flex items-center space-x-1 px-2 py-1 rounded-sm bg-taupe-200">
          <span><Clock size="14"/></span>
          <span className="text-xs font-medium">
            {recipe.cook_time + recipe.prep_time} mins
          </span>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 rounded-sm bg-taupe-200">
          <span><User size="14"/></span>
          <span className="text-xs font-medium">
            {recipe.servings} Servings
          </span>
        </div>
      </div>
      <div className="flex flex-col my-6">
        {recipe.ingredients.map((ingredient) => (
          <div className="flex justify-between">
            <span>{ingredient.name}</span>
            <span>{ingredient.quantity} {ingredient.unit}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col my-6">
        {recipe.instructions.map((instruction) => (
          <div>
            {instruction.step_number} - {instruction.content}
          </div>
        ))}
      </div>
    </div>
  )
}