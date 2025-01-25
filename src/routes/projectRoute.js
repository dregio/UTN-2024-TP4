import { Router } from 'express';
import tc from '../controllers/projectController.js';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';

const projectRoute = Router();

projectRoute.get(	"/get", 			verifyTokenMiddleware, tc.getProjects);
projectRoute.post(	"/create",		 	verifyTokenMiddleware, tc.createProject);
projectRoute.get(	"/get-by-id/:id",	verifyTokenMiddleware, tc.getProject);
projectRoute.put(	"/update/:id",		verifyTokenMiddleware, tc.updateProject);
projectRoute.delete("/delete/:id",		verifyTokenMiddleware, tc.deleteProject);

export default projectRoute; 