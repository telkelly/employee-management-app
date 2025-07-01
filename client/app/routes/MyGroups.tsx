import {useEffect, useState} from 'react';
import API from '../api/axios';
import {Link} from "react-router-dom";

export default function MyGroups() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const token = localStorage.getItem('token');
            const res = await API.get('/group/my-groups', {
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log("Fetched groups:", res.data.groups);
            console.log("Is array:", Array.isArray(res.data.groups));
            setGroups(res.data.groups);

        };

        fetchGroups();
    }, []);

    const handleGroupClick =()=>{

    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Groups</h2>
            <ul className="space-y-4">
                {groups.map(group => (
                    <li key={group._id} className="border p-4 rounded shadow">
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-gray-600">Invite code: {group.inviteCode}</p>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `http://localhost:5173/join/${group.inviteCode}`
                                );
                                alert('Invite link copied!');
                            }}
                        >
                            Copy Invite Link
                        </button>
                        {group.members.map((member:any) => (
                            <h3 className="font-semibold">{member.name}</h3>
                        ))}
                        <Link to={`/group/${group._id}/tasks`}><button onClick={handleGroupClick}>See tasks</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
