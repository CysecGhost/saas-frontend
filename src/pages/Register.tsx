import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";

import FormContainer from "../components/FormContainer";
import Button from "../components/Button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      } else if (password.length < 6) {
        console.error("Password must be at least 6 characters");
        return;
      } else if (!email || !password || !confirmPassword) {
        console.error("fill the required fields");
        return;
      }

      const res = await register({
        email,
        password,
      }).unwrap();
      navigate("/login");
      console.log("Registration successful", res);
    } catch (err) {
      const message =
        err || "Something went wrong";
      console.error(message);
      console.error(`Registration Error: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <FormContainer title={"Register"}>
        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="*Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Register;
