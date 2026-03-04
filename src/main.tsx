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
import store from './store.ts'
import App from './App.tsx'
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/dashboard' element={<Dashboard /> } />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </Provider>
)
