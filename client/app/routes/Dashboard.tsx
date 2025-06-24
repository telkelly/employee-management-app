import {useEffect, useState} from 'react';
import API from '../api/axios';
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState({name: "", role: ""});
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await API.get('/private/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data.user);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard:", err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}</h1>
            <h3>Role: {user.role}</h3>

            {user.role === "admin" ? (
                <div>
                    <h2>Admin Panel</h2>
                    <ul>
                        <li>Create & manage groups</li>
                        <li>Create & manage tasks</li>
                        <li>Edit schedule</li>
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>Employee Panel</h2>
                    <ul>
                        <li>View schedule</li>
                        <li>Create and manage tasks</li>
                    </ul>
                </div>
            )}
        </div>
    );
}