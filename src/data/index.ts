import { recipes } from "./recipes";
import { ingredients } from "./ingredients";
import { recipeIngredients } from "./recipe-ingredients";

export function getRecipeByHandle(handle: string) {
  const recipe = recipes.find(r => r.handle === handle);
  if (!recipe) return null;

  const ingredientLines = recipeIngredients
    .filter(ri => ri.recipe_id === recipe.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(ri => {
      const ingredient = ingredients.find(i => i.id === ri.ingredient_id);
      return {
        id: ri.id, // the join row id — stable, good for the checked Set
        name: ingredient?.name ?? "Unknown",
        quantity: ri.quantity,
        unit: ri.unit,
        preparation: ri.preparation,
        sort_order: ri.sort_order,
      };
    });

    return { ...recipe, ingredients: ingredientLines }
}