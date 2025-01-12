import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(204).json({ message: "No tasks found" });
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

