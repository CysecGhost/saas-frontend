import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register({ email, password }).unwrap();
      navigate("/login");
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Create account</h1>
        <p className="text-gray-500 text-sm mb-8">Sign up to get started</p>

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
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;