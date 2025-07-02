import {useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function JoinGroup() {
    const { inviteCode } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const joinGroup = async () => {
            try {
                const res = await API.post(`/group/join/${inviteCode}`, null, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setMessage(res.data.message);
                navigate('/dashboard');
            } catch (err: any) {
                setMessage(err.response?.data?.error || 'Failed to join');
            }
        };

        joinGroup();

    }, [inviteCode]);

    return <p>{message}</p>;
}
