import Task from "../models/taskModel.js";
import { LangFromReq, msg } from "../utils/lang.js";

export const getTasks = async (req, res) => {
    const lang = LangFromReq(req);
    try {
        const tasks = await Task.find()
            .populate("project_id")
            .populate("user_id");
        if (tasks.length === 0) {
            return res.status(204).json({ message: lang.tr(msg.NO_TASKS_FOUND) });
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }
}

// Crea una tarea. 
// Las tareas pueden tener el nombre repetido, por lo que no se valida si ya existe.
// El nombre se puede repetir en distintos proyectos, como es lógico, pero también en el mismo proyecto, por razones de experiencia de usuario. En cambio,
// el nombre de un proyecto no se puede repetir. 
// TODO3: Agregarlo al Readme.
export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({ message: "Task created" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id)
            .populate("project_id")
            .populate("user_id");
        if (!task) {
            return res.status(404).json({ message: `Task ${id} not found.${mn(1001)}` });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}