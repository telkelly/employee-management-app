import { useState } from 'react';
import API from '../api/axios';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
    const [message, setMessage] = useState('');

    const handleChange = (e: { target: { name: any; value: any; }; }) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            setMessage(res.data.message);
        } catch (err) {
            // @ts-ignore
            setMessage(err.response?.data?.error || 'Error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
}