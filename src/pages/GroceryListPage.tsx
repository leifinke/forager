import { useState } from "react";
import { Link, useParams } from "react-router";
import { getRecipeByHandle } from "../data";
import { ChevronLeft } from "lucide-react";
import toFraction from "../utils/formatQuantity";


export default function GroceryListPage() {
  const { handle } = useParams();
  const recipe = handle ? getRecipeByHandle(handle) : null;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  if (!recipe) {
    return <h1 className="text-2xl font-bold">Grocery List Not Found.</h1>;
  };

  const toggle = (name: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="bg-white">
      <Link to={`/recipe/${recipe.handle}`} className="flex absolute mt-3 ml-3">
        <span className="bg-white rounded-full p-2"><ChevronLeft /></span>
      </Link>
      <div className="flex py-5 px-6 justify-center">
        <h1 className="text-lg">Grocery List</h1>
      </div>
      <div className="flex flex-col p-6">
        <h2 className="mb-4">{recipe.name}</h2>
        <div className="flex flex-1">
          <ul className="flex flex-1 flex-col">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className={`flex rounded-lg ${index % 2 != 0 ? "bg-warm-cream" : "bg-white"}`}>
              <label className="flex p-4 gap-4 flex-1">
                <input 
                  className="scale-125 accent-green-700" 
                  type="checkbox"
                  checked={checked.has(ingredient.name)}
                  onChange={() => toggle(ingredient.name)}
                ></input>
                <span className={`flex flex-col ${checked.has(ingredient.name) ? "line-through text-gray-400" : ""}`}>
                  <span className="font-semibold">{ingredient.name}</span>
                  <span className="text-xs">{toFraction(ingredient.quantity)} {ingredient.unit}</span>
                </span>
              </label>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
}