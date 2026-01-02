import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/sisignupSlice";

function Signup() {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.signup);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = () => dispatch(signupUser(form));

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <input
        className="p-2 w-full mb-2 border"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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
        {loading ? "Signing up..." : "Signup"}
      </button>

      {success && <p className="text-green-600 mt-3">Signup successful!</p>}
    </div>
  );
}

export default Signup;
