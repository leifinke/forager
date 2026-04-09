import { Link } from "react-router"

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-green-700 logo">
          Forager
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <Link to="/categories" className="hover:text-green-700">Categories</Link>
          <Link to="/grocery-list" className="hover:text-green-700">Grocery List</Link>
        </div>
      </div>
    </nav>
  )
}