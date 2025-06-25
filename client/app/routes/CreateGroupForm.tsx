import { useState } from 'react';
import API from '../api/axios';
import {useNavigate} from "react-router-dom";

export default function CreateGroupForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await API.post(
                '/group/create',
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(`Group created! Invite code: ${res.data.group.inviteCode}`);
            navigate('/my-groups');

        } catch (err) {
            setMessage('Failed to create group');
        }
    };

    return (
        <form onSubmit={handleCreate} className="group-form">
            <h3>Create New Group</h3>
            <input
                placeholder="Group Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Group</button>
            {message && <p>{message}</p>}

        </form>
    );
}
