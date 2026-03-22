import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
        <h1 className="text-4xl font-bold text-center mt-10">Admin Dashboard</h1>
        <p className="text-center mt-4 text-gray-600">
            Welcome to the admin dashboard. Use the navigation to access different sections.
        </p>
        <div className="mt-10 flex justify-center gap-4">
            <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Login
            </Link>
            <Link
                to="/register"
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            >
                Register
            </Link>
            <Link
                to="/admin/dashboard"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
                Dashboard
            </Link>
            <Link
                to="/organizations"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
                Organizations
            </Link>
            <Link
                to="/admin/products"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            >
                Products
            </Link>
            <Link
                to="/admin/products/create"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                Create Product
            </Link>
            <Link
                to="/admin/orders/create"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
                Create Order
            </Link>
        </div>
    </>
  )
}

export default Home;