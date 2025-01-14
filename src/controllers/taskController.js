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
        res.status(201).json({ message: lang.tr(msg.TASK_CREATED) });
    }
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }
}

export const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id)
            .populate("project_id")
            .populate("user_id");
        if (!task) {
            return res.status(404).json({ 
                message: lang.tr(msg.TASK_NOT_FOUND, id) });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }
}

export const updateTask = async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).json({ 
                message: lang.tr(msg.TASK_NOT_FOUND, _id) });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            _id, req.body, { new: true });;
        res.status(201 ).json(updatedTask);
    } 
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).json({ 
                message: lang.tr(msg.TASK_NOT_FOUND, _id) });
        }
        await Task.findByIdAndDelete(_id);
        res.status(201).json({ message: lang.tr(msg.TASK_DELETED) });
    }
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }   
}

export const getTaskStatusList = async (req, res) => {
    try {
        return res.status(200).json(TaskStatus);
    }
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }
}

export const getTaskPriorityList = async (req, res) => {
    try {
        return res.status(200).json(TaskPrio);
    }
    catch (error) {
        res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
    }
}

export default { getTasks, createTask, getTask, updateTask, deleteTask, getTaskStatusList, getTaskPriorityList };