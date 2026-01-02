import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authThunks';


export default function Login() {
const dispatch = useDispatch();
const { loading, error } = useSelector((state) => state.auth);


const [form, setForm] = useState({ email: '', password: '' });


function handleChange(e) {
setForm({ ...form, [e.target.name]: e.target.value });
}


function handleSubmit(e) {
e.preventDefault();
dispatch(loginUser(form));
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