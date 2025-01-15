import { Router } from 'express';
import tc from '../controllers/projectController.js';

const projectRoute = Router();

projectRoute.get("/get", tc.getProjects);
projectRoute.post("/create", tc.createProject);
projectRoute.get("/get-by-id/:id", tc.getProject); // TODO2: Agregar middleware.
projectRoute.put("/update/:id", tc.updateProject)
projectRoute.delete("/delete/:id", tc.deleteProject)

export default projectRoute; 