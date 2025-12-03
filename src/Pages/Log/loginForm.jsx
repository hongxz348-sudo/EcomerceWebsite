import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [information, setInformation] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/backend/users")
      .then((res) => setInformation(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = information.find(
      (item) =>
        item.username.toString().trim() === username.trim() &&
        item.password.toString().trim() === password.trim()
    );

    if (user) {
      if (user.role === "admin") {
        setType("success");
        setMessage("Login Successfully...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setType("success");
        setMessage("Login Successfully...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      setType("error");
      setMessage("Incorrect username or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        {message && (
          <div
            className={`p-3 mb-4 rounded-lg text-white text-center ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <h2 className="text-2xl font-extrabold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
                       hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{"  "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
