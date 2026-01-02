import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/signupSlice";

function Signup() {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.signup);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = () => {
    dispatch(signupUser(form));
  };

  return (
    <div>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleSubmit}>
        {loading ? "Loading..." : "Signup"}
      </button>

      {success && <p>Signup Successful!</p>}
    </div>
  );
}

export default Signup;
