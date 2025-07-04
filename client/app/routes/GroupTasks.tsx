import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import API from "../api/axios";

export default function GroupTasks() {
    const {groupId} = useParams();
    const [tasks, setTasks] = useState<any[]>([]);
    const [form, setForm] = useState({title: "", description: "", dueDate: ""})

    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
        try {
            const res = await API.get(`/tasks/${groupId}`,
                {headers: {Authorization: `Bearer ${token}`}})
            console.log(res.data.tasks)
            setTasks(res.data.tasks);
        } catch (err) {
            console.log('Failed to load', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [groupId])

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post(`/tasks/${groupId}`, form, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setForm({title: "", description: "", dueDate: ""})
            const res = await API.get(`/tasks/${groupId}`, {headers: {Authorization: `Bearer ${token}`}});
            setTasks(res.data.tasks);
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (taskId: string) => {
        try {
            await API.delete(`/tasks/${taskId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            fetchTasks(); // refresh tasks after delete
        } catch (err) {
            console.log("Failed to delete", err);
        }
    };

    return (
        <div>
            <h2>Tasks in Group</h2>
            <h4>Create task</h4>
            <form onSubmit={handleSubmit}>
                <input type={"text"} name={"title"} placeholder={"Title"} value={form.title} onChange={handleChange}
                       required/>
                <textarea name={"description"} placeholder={"Description"} value={form.description}
                          onChange={handleChange}/>
                <input type={"date"} name={"dueDate"} value={form.dueDate} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {tasks.length === 0 ? (
                    <li className="p-3 text-center text-gray-500">No tasks already</li>
                ) : (tasks.map((task: any) => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No deadline"}</p>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-600 underline"
                        >
                            Delete Task
                        </button>
                    </li>
                )))}
            </ul>
        </div>
    )
}