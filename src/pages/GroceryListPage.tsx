import { Link, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { getRecipeByHandle } from "../data";


export default function GroceryListPage() {

  const { handle } = useParams();

  const recipe = handle ? getRecipeByHandle(handle) : null;

  if (!recipe) {
    return <h1 className="text-2xl font-bold">Grocery List Not Found.</h1>;
  };

  return (
    <div>
      <Link to={`/recipe/${recipe.handle}`} className="flex absolute mt-3 ml-3">
        <span className="bg-white rounded-full shadow-md p-2"><ChevronLeft /></span>
      </Link>
      <div className="flex p-6 justify-center">
        <h1 className="text-lg">Grocery List</h1>
      </div>
      <div className="flex flex-col p-6">
        <h2 className="mb-4">{recipe.name}</h2>
        <div className="flex">
          <ul className="flex w-100 flex-col">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className={`flex p-4 rounded-lg ${index % 2 != 0 ? "bg-olive-100" : "bg-white"}`}>
              <label className="flex gap-4">
                <input className="scale-125 accent-olive-600" type="checkbox"></input>
                <span className="font-semibold">{ingredient.name}</span>
              </label>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
}