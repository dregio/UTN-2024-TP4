import { get } from "mongoose";
import Task, { TaskPrio, TaskStatus } from "../models/taskModel.js";
import { LangFromReq, msg } from "../utils/multiLanguage.js";
import Project from "../models/projectModel.js";

export const taskController = {

    getTasks: async (req, res) => {
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
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    // Crea una tarea. 
    // Las tareas pueden tener el nombre repetido, por lo que no se valida si ya existe.
    // El nombre se puede repetir en distintos proyectos, como es lógico, pero también en el mismo proyecto, por razones de experiencia de usuario. En cambio,
    // el nombre de un *proyecto* no se puede repetir. 
    
    createTask: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const newTask = new Task(req.body);
            const existingTask = await Task.findOne({ project_id: newTask.project_id, number: newTask.number })
            if (existingTask) {
                return res.status(409).json({ 
                    message: lang.tr(msg.TASK_NUMBER_ALREADY_EXISTS, newTask.number) });
            }
            await newTask.save();
            res.status(201).json(newTask);
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    getTask: async (req, res) => {
        const lang = LangFromReq(req);
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
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    getTasksByProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const project_id = req.params.id;
			// Valida que el proyecto exista.
			const project = await Project.findById(project_id);
			if (!project) {
				return res.status(404).json({ 
					message: lang.tr(msg.PROJECT_NOT_FOUND, project_id) });
			}
			// Obtiene las tareas del proyecto.
			const tasks = await Task.find({ project_id })
                .populate("project_id")
                .populate("user_id");
			// Si no hay tareas, devuelve un 204.
            if (tasks.length === 0) {
                return res.status(204).json({ 
                    message: lang.tr(msg.NO_TASKS_FOR_PROJECT) });
                };
			// Devuelve las tareas.
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    updateTask: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const _id = req.params.id;
            const task = await Task.findById(_id);
			// Valida que la tarea exista.
            if (!task) {
                return res.status(404).json({ 
                    message: lang.tr(msg.TASK_NOT_FOUND, _id) });
            }
			// Valida que exista el project_id.
			const project = await Project.findById(req.body.project_id);
			if (!project) {
				return res.status(404).json({ 
					message: lang.tr(msg.PROJECT_NOT_FOUND, req.body.project_id) });
			}
		
			// Valida que el número de tarea no exista en el proyecto de destino
			// Si el proyecto es el mismo, se permite que el número sea el mismo.
			const existingTask = await Task.findOne({ 
					project_id: project._id,
					number: req.body.number,
					_id: { $ne: _id } // Excluir la propia tarea.
				});
			if (existingTask) {
				return res.status(409).json({ 
					message: lang.tr(msg.TASK_NUMBER_ALREADY_EXISTS, req.body.number) });
			}
			// Actualiza la tarea.
            const updatedTask = await Task.findByIdAndUpdate(
                _id, req.body, { new: true });
            res.status(201).json(lang.resMsjObj(updatedTask, msg.TASK_UPDATED));
        } 
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    deleteTask: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const _id = req.params.id;
            const task = await Task.findById(_id);
            if (!task) {
                return res.status(404).json({ 
                    message: lang.tr(msg.TASK_NOT_FOUND, _id) });
            }
            await Task.findByIdAndDelete(_id);
            res.status(201).json(lang.resMsjObj(task, msg.TASK_DELETED));
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }   
    },

    getTaskStatusList: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            return res.status(200).json(TaskStatus);
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    getTaskPriorityList: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            return res.status(200).json(TaskPrio);
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    }
}

export default taskController;