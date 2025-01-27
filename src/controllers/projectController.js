import { debugging } from "../config.js";
import Project from "../models/projectModel.js";
import { LangFromReq, msg } from "../utils/multiLanguage.js";

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
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    createProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const newProject = new Project(req.body);
            const { name } = newProject;
            const existingProject = await Project.findOne({ name });
            if (existingProject) {
                return res.status(409).json({ message: lang.tr(msg.PROJECT_ALREADY_EXISTS) });
            }
            await newProject.save();
			res.status(201).json(lang.resMsjObj(newProject, msg.PROJECT_CREATED));
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    getProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const id = req.params.id;
            const project = await Project.findById(id);
            if (!project) {
                return res.status(404).json({ 
                    message: lang.tr(msg.PROJECT_NOT_FOUND, id) });
            }
            res.status(200).json(project);
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
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
            res.status(201 ).json(lang.resMsjObj(updatedProject, msg.PROJECT_UPDATED));
        } 
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }
    },

    deleteProject: async (req, res) => {
        const lang = LangFromReq(req);
        try {
            const _id = req.params.id;
            debugging && console.log("🚀 ~ deleteProject: ~ _id:", _id)
            const project = await Project.findById(_id);
            if (!project) {
                return res.status(404).json({ 
                    message: lang.tr(msg.PROJECT_NOT_FOUND, _id) });
            }
            await Project.findByIdAndDelete(_id);
            res.status(201).json(lang.resMsjObj(project, msg.PROJECT_DELETED));
        }
        catch (error) {
            res.status(500).json(lang.internalServerErrorObj(error));
        }   
    }
}

export default projectController;