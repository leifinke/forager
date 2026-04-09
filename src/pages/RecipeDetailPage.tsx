import { useParams } from "react-router";

export default function RecipeDetailPage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Recipe {id}</h1>;
}