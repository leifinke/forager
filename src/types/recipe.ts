export interface Recipe {
  id: string;
  name: string;
  handle: string;
  description: string;
  category: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  image_url: string | null;
  instructions: Instructions[];
}

// export interface Ingredients {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   sort_order: number;
// }

export interface Ingredients {
  id: string;
  name: string;
}

export interface Instructions {
  id: string;
  step_number: number;
  content: string;
}

export interface RecipeIngredients {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  quantity: number;
  unit: string;
  preparation: string | null;
  sort_order: number;
}

