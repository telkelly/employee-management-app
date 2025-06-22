import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await API.get('/private/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(res.data);
            } catch (err) {
                // @ts-ignore
                setData({ error: err.response?.data?.error || 'Unauthorized' });
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {data}
        </div>
    );
}
