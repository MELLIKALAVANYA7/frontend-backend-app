import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      userId: req.userId,
      title
    });

    res.json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, title } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { completed, title },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: req.userId
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
