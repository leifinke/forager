import { Link } from "react-router";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav>
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-4">
        <Link to="/" className="flex logo items-center gap-2">
          <span><Leaf /></span>
          <span>Forager</span>
        </Link>
        {/* <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <Link to="/categories" className="hover:text-green-700">Categories</Link>
          <Link to="/grocery-list" className="hover:text-green-700">Grocery List</Link>
        </div> */}
      </div>
    </nav>
  )
}