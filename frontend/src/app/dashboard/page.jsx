"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  // Fetch profile + tasks
  const fetchData = async () => {
    try {
      const profileRes = await api.get("/user/profile");
      const taskRes = await api.get("/tasks");
      setUser(profileRes.data.user);
      setTasks(taskRes.data.tasks);
    } catch (err) {
      alert("Authorization failed. Please login again.");
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title.trim()) return alert("Enter a task");
    await api.post("/tasks", { title });
    setTitle("");
    fetchData();
  };

  // Toggle Completion
  const toggleTask = async (id, currentStatus) => {
    await api.put(`/tasks/${id}`, { completed: !currentStatus });
    fetchData();
  };

  // Delete Task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchData();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Welcome Message */}
        <p className="mt-2 text-gray-700">
          Welcome, <b>{user.name}</b> ({user.email})
        </p>

        {/* Add Task */}
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Tasks List */}
        <ul className="mt-6 space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-3 border rounded bg-white"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, task.completed)}
                  />
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}
