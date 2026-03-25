import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.accessToken));
      navigate("/organizations");
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;