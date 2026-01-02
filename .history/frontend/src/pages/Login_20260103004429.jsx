import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/login/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) navigate("/product");
  }, [token, navigate]);

  const submit = () => dispatch(loginUser(form));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-2xl shadow-xl flex overflow-hidden">

        {/* Left Side Image */}
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center p-6">
          <img
            src="/side-image.png"   // <-- same image used in signup
            alt="Illustration"
            className="w-72"
          />
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6">Login</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm">Email</label>
              <input
                className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <input
                className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button
              onClick={submit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="text-red-600 mt-2">{error}</p>
            )}

            <p className="text-sm mt-3">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
