import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authThunks';


export default function Signup() {
const dispatch = useDispatch();
const { loading, error } = useSelector((state) => state.auth);


const [form, setForm] = useState({ name: '', email: '', password: '' });


function handleChange(e) {
setForm({ ...form, [e.target.name]: e.target.value });
}


function handleSubmit(e) {
e.preventDefault();
dispatch(signupUser(form));
}


return (
<div>
<h2>Signup</h2>
<form onSubmit={handleSubmit}>
<input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
<input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
<input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
<button type="submit" disabled={loading}>Sign up</button>
</form>
{error && <p style={{color:'red'}}>{error}</p>}
</div>
);
}