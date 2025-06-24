import {useState} from 'react';
import API from '../api/axios';
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({name: '', email: '', password: '', role: 'employee'});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any; }; }) => setForm({
        ...form,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            setMessage(res.data.message);
        } catch (err) {
            // @ts-ignore
            setMessage(err.response?.data?.error || 'Error occurred');
        }
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit} className="login-form register-form">
            <h2 className="login-title">Create Account</h2>
            <p className="login-subtitle register-subtitle">Join us to manage your work easily!</p>

            <div className="form-group register-form-group">
                <label htmlFor="name">First Name</label>
                <input className="form-input" name="name" placeholder="Name" onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input className="form-input" name="lastName" placeholder="Last Name" onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-input" name="email" placeholder="Email" onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    className="form-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select name="role" className="form-input" onChange={handleChange}>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="login-button">Register</button>
            <p className="login-message">{message}</p>

            <div className="login-footer">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </form>
    );
}