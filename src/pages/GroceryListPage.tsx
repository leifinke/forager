import { useParams } from "react-router";
import { recipes } from "../data/recipes";


export default function GroceryListPage() {

  const { handle } = useParams();

  const recipe = recipes.find(recipe => recipe.handle === handle);

  if (!recipe) {
    return <h1 className="text-2xl font-bold">Grocery List Not Found.</h1>;
  };

  return (
    <div className="flex flex-col p-6">
      <h1>Grocery List</h1>
      <h2>{recipe.name}</h2>
      <div className="flex bg-white p-6 my-4">
        <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="flex my-2">
            <label className="flex gap-2">
              <input type="checkbox"></input>
              {ingredient.name}
            </label>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}