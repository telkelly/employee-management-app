import {useEffect, useState} from 'react';
import API from '../api/axios';
import {useNavigate} from "react-router-dom";
import MyGroups from "~/routes/MyGroups";

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

    const handleLogout= ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        navigate('/login');
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard">
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <h1>Welcome, {user.name}</h1>

            {user.role === "admin" ? (
                <div>
                    <h2>Admin Panel</h2>
                    <ul>
                        <li>Create & manage groups</li>
                        <a href='/create'>Create it</a>
                        <MyGroups/>
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