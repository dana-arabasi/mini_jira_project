import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/issues");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 rounded bg-gray-700"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 rounded bg-gray-700 w-full"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded mt-2">
          Login
        </button>


        <p className="text-sm text-gray-400 text-center mt-2">
          Don't have an account?{" "}
          <span
            className="text-indigo-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;