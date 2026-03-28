import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Provider } from "react-redux";
import ProtectedRoute from './components/ProtectedRoute.tsx';
import store from './store.ts'
import App from './App.tsx'
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Organizations from './pages/Organizations.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import CreateProduct from './pages/CreateProduct.tsx';
import Products from './pages/Products.tsx';
import CreateOrder from './pages/CreateOrder.tsx';
import Orders from './pages/Orders.tsx';
import Layout from './components/Layout.tsx';
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public */}
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Needs token only */}
      <Route
        element={
          <ProtectedRoute requireOrg={false}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/organizations" element={<Organizations />} />
      </Route>

      {/* Needs token + orgId */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/create" element={<CreateProduct />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/orders/create" element={<CreateOrder />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </StrictMode>
  </Provider>
)
