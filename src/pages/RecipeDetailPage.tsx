import { useParams, Link } from "react-router";
import { useState } from "react";
import { recipes } from "../data/recipes";
import { ChevronLeft, Clock, User } from "lucide-react";

export default function RecipeDetailPage() {
  const { handle } = useParams();
  const [activeTab, setActiveTab] = useState("ingredients");

  const recipe = recipes.find(recipe => recipe.handle === handle);

  if (!recipe) {
    return <h1 className="text-2xl font-bold">Recipe Not Found.</h1>;
  }

  return (
    <div>
      <Link to="/" className="flex absolute mt-3 ml-3">
        <span className="bg-white rounded-full shadow-md p-2"><ChevronLeft /></span>
      </Link>
      {recipe.image_url &&
        <div className="flex h-64 overflow-hidden aspect-[4/5] w-full">
          <img src={`/images/${recipe.image_url}`} alt={recipe.name} className="w-full h-full object-cover object-center" />
        </div>
      }
      <div className="flex flex-col p-6 gap-6 bg-white">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-2">{recipe.name} </h1>
          <p className="mb-2">{recipe.description}</p>
        </div>
        <div className="flex items-center gap-2">
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
        <div className="flex bg-olive-100 rounded-lg p-2 gap-2 relative">
          <div className={`absolute top-2 bottom-2 w-[calc(50%-6px)] bg-white rounded-lg shadow-xs transition-transform duration-300 ease-in-out ${activeTab === "ingredients" ? "translate-x-0" : "translate-x-[calc(100%-8px)]"}`}/>
          <button 
            onClick={() => setActiveTab("ingredients")}
            className="flex flex-grow p-2 font-semibold tracking-wide text-sm justify-center relative z-10 flex flex-grow">Ingredients
          </button>
          <button 
            onClick={() => setActiveTab("instructions")}
            className="flex flex-grow p-2 font-semibold tracking-wide text-sm justify-center relative z-10 flex flex-grow">
            Instructions
          </button>
        </div>
        {activeTab === "ingredients" && (
          <div className="flex flex-col gap-1">
            {recipe.ingredients.map((ingredient, index) => (
              <div 
                key={index}
                className={`flex justify-between py-3 px-4 rounded-lg ${index % 2 !== 0 ? "bg-olive-100" : "bg-white"}`}
              >
                <span className="font-semibold text-md capitalize">{ingredient.name}</span>
                <span className="font-normal text-sm text-taupe-600">{ingredient.quantity} {ingredient.unit}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "instructions" && (
          <div className="flex flex-col">
            {recipe.instructions.map((steps, index) => (
              <div
                key={index}
                className="flex gap-4 py-3 px-1 rounded-lg"
              >
                <div className="flex">
                  <span className="flex rounded-full items-center justify-center bg-olive-100 w-8 h-8 font-semibold">{steps.step_number}</span>
                </div>
                <div className="flex">
                  <span className="">{steps.content}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}