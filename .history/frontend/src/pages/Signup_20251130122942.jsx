import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearError } from '../store';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowSuccess(false);
    const res = await dispatch(signupUser(form));
    if (res.type.endsWith('fulfilled')) setShowSuccess(true);
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit" disabled={loading}>Sign up</button>
      </form>
      {showSuccess && <p style={{color:'green'}}>Signup successful! Please log in.</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}