import Project from "../models/projectModel.js";
import { LangFromReq, msg } from "../utils/lang.js";

export const projectController = {

    getProjects: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const projects = await Project.find();
            if (projects.length === 0) {
                return res.status(204).json({ message: lang.tr(msg.NO_PROJECTS_FOUND) });
            }
            res.status(200).json(projects);
        }
        catch (error) {
            res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
        }
    },

    createProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const newProject = new Project(req.body);
            await newProject.save();
            res.status(201).json({ message: lang.tr(msg.PROJECT_CREATED) });
        }
        catch (error) {
            res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
        }
    },

    getProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const id = req.params.id;
            const project = await Project.findById(id)
                .populate("project_id")
                .populate("user_id");
            if (!project) {
                return res.status(404).json({ 
                    message: lang.tr(msg.PROJECT_NOT_FOUND, id) });
            }
            res.status(200).json(project);
        }
        catch (error) {
            res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
        }
    },

    updateProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const _id = req.params.id;
            const project = await Project.findById(_id);
            if (!project) {
                return res.status(404).json({ 
                    message: lang.tr(msg.PROJECT_NOT_FOUND, _id) });
            }

            const updatedProject = await Project.findByIdAndUpdate(
                _id, req.body, { new: true });;
            res.status(201 ).json(updatedProject);
        } 
        catch (error) {
            res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
        }
    },

    deleteProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const _id = req.params.id;
            const project = await Project.findById(_id);
            if (!project) {
                return res.status(404).json({ 
                    message: lang.tr(msg.PROJECT_NOT_FOUND, _id) });
            }
            await Project.findByIdAndDelete(_id);
            res.status(201).json({ message: lang.tr(msg.PROJECT_DELETED) });
        }
        catch (error) {
            res.status(500).json({ message: lang.tr(msg.INTERNAL_SERVER_ERROR, error.message) });
        }   
    }
}

export default projectController;