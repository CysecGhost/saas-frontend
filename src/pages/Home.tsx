import { Link } from "react-router-dom";

const links = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/organizations", label: "Organizations" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/products/create", label: "Create Product" },
  { to: "/admin/orders/create", label: "Create Order" },
  { to: "/admin/orders", label: "Orders" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold text-white tracking-tight mb-3">Admin Dashboard</h1>
      <p className="text-gray-500 text-sm mb-12">Select a module to get started</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium hover:bg-gray-800 hover:text-white hover:border-gray-600 transition"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;