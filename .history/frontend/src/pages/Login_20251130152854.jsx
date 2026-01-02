import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/login/authSlice";

function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    dispatch(loginUser(form));
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleSubmit}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>Invalid Credentials</p>}
    </div>
  );
}

export default Login;
