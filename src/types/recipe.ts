export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  image_url: string | null;
  ingredients: Ingredients[];
  instructions: Instructions[];
}

export interface Ingredients {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  sort_order: number;
}

export interface Instructions {
  id: string;
  step_number: number;
  content: string;
}