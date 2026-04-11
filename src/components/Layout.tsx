import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  };

  const linkBase = "flex items-center px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition";
  const active = "bg-gray-800 text-white";

  const NavLinks = () => (
    <>
      <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Home</NavLink>
      <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Dashboard</NavLink>
      <NavLink to="/admin/products" end className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Products</NavLink>
      <NavLink to="/admin/orders" end className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Orders</NavLink>
      <NavLink to="/admin/products/create" end className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Create Product</NavLink>
      <NavLink to="/admin/orders/create" end className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Create Order</NavLink>
      <NavLink to="/organizations" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} onClick={() => setSidebarOpen(false)}>Organizations</NavLink>
    </>
  );

  return (
    <div className="h-screen flex bg-gray-950 text-white overflow-hidden">
      <Toaster position="top-right" />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-xs text-gray-500">Control center</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavLinks />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-white">Admin Panel</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;