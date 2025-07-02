import {useEffect, useState} from 'react';
import API from '../api/axios';
import {Link} from "react-router-dom";

export default function MyGroups() {
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await API.get('/group/my-groups', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setGroups(res.data.groups);
            }catch (err){
                console.log('Failed to load', err);
            }
        };

        fetchGroups();
    }, []);

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
                        {group.members.map((member: any) => (
                            <h3 className="font-semibold">{member.name}</h3>
                        ))}
                        <Link to={`/group/${group._id}/tasks`}>
                            <button>See tasks</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
