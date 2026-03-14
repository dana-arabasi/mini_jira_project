import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { email, password });

      setMessage("Account created successfully! Redirecting to login...");

      // بعد ثانيتين ينقله لصفحة اللوجن
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.detail || "Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded-xl w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-700 w-full"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded">
          Sign Up
        </button>

        {message && <p className="text-sm text-center text-green-400">{message}</p>}

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default SignupPage;
