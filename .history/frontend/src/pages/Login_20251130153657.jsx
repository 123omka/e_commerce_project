import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/login/authSlice";

function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = () => dispatch(loginUser(form));

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        className="p-2 w-full mb-2 border"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="p-2 w-full mb-4 border"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={handleSubmit}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className="text-red-600 mt-3">Invalid Login</p>}
    </div>
  );
}

export default Login;
