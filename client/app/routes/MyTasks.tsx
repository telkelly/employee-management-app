import { useEffect, useState } from "react";
import API from "../api/axios";

function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await API.get("/tasks/my-tasks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(res.data.tasks);
            } catch (err: any) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks assigned yet.</p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task: any) => (
                        <li key={task._id} className="p-3 border rounded shadow">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">
                                Due: {task.dueDate?.slice(0, 10) || "No deadline"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyTasks;
