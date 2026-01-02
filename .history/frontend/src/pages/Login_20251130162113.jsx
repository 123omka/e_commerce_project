import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/loauthSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) navigate("/profile");
  }, [token]);

  const submit = () => dispatch(loginUser(form));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input className="w-full mb-2 p-2 border" placeholder="Email" value={form.email}
             onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input className="w-full mb-4 p-2 border" type="password" placeholder="Password" value={form.password}
             onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={submit}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
