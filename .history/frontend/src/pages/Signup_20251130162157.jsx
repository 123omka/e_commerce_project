import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetSignup } from "../features/signupsignupSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((s) => s.signup);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (success) {
      // after signup redirect to login
      dispatch(resetSignup());
      navigate("/login");
    }
  }, [success]);

  const submit = () => {
    dispatch(signupUser(form));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <input className="w-full mb-2 p-2 border" placeholder="Name" value={form.name}
             onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input className="w-full mb-2 p-2 border" placeholder="Email" value={form.email}
             onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input className="w-full mb-4 p-2 border" type="password" placeholder="Password" value={form.password}
             onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={submit}>
        {loading ? "Signing up..." : "Signup"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
