import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import MyGroups from './MyGroups';
import MyTasks from "~/routes/MyTasks";

export default function Dashboard() {
    const [user, setUser] = useState({ name: '', role: '' });
    const [tasks, setTasks] = useState([]);
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
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.user);
            } catch (err) {
                console.error('Error fetching dashboard:', err);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        if (user.role !== 'employee') return;

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await API.get('/tasks/my-tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(res.data.tasks);
            } catch (err) {
                console.error('Failed to load tasks', err);
            }
        };

        fetchTasks();
    }, [user.role]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard">
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <h1>Welcome, {user.name}</h1>

            {user.role === 'admin' ? (
                <div>
                    <h2>Admin Panel</h2>
                    <ul>
                        <li>
                            <a href="/create" className="text-blue-600 underline">
                                Create & manage groups
                            </a>
                        </li>
                        <li><MyGroups /></li>
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
                    <MyTasks/>
                </div>
            )}
        </div>
    );
}
