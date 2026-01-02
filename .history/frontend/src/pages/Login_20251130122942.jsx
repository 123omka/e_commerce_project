import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.type.endsWith('fulfilled')) window.location.href = '/protected';
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit" disabled={loading}>Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}