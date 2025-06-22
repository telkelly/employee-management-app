import {useState} from 'react';
import API from '../api/axios';

export default function Login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            setMessage('Login successful!');
        } catch (err: any) {
            setMessage(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Welcome,</h2>
            <p className="login-subtitle">Let’s plan your day and goals!</p>

            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-input"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-options">
                <div className="remember">
                    <input type="checkbox" id="remember" defaultChecked/>
                    <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">Sign in</button>

            {message && <p className="login-message">{message}</p>}

            <div className="login-footer">
                <p>Not a member? <a href="#">Register</a></p>
                <p className="social-text">or sign in with:</p>
                <div className="social-buttons">
                    <button type="button" className="social-btn">G</button>
                </div>
            </div>
        </form>
    );
}
