import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState()); 
    navigate("/login");
  };

  const linkBase =
    "flex items-center px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition";

  const active =
    "bg-gray-800 text-white";

  return (
    <div className="h-screen flex bg-gray-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col">
        
        {/* Logo / Title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-xs text-gray-500">Control center</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 flex-1">

            <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/admin/products/create"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Create Product
          </NavLink>

          <NavLink
            to="/admin/orders/create"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Create Order
          </NavLink>

          <NavLink
            to="/organizations"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Organizations
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;