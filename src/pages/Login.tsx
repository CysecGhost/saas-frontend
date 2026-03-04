import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, }] = useLoginMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        console.error("fill the required fields");
        return;
      }
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.accessToken));
      navigate("/dashboard");
      console.log("Login successful");
    } catch (err) {
      const message =
        err || "Something went wrong";
      console.error(message);
      console.log(`Login Error: ${message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <FormContainer title={"Login"}>
        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                Register here
              </Link>
            </p>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
