import { Router } from 'express';
import tc from '../controllers/taskController.js';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';

const taskRoute = Router();

taskRoute.get(	 "/get", 					verifyTokenMiddleware, tc.getTasks);
taskRoute.post(	 "/create",					verifyTokenMiddleware, tc.createTask);
taskRoute.get(	 "/get-by-id/:id",			verifyTokenMiddleware, tc.getTask); 
taskRoute.get(	 "/get-by-number/:number",	verifyTokenMiddleware, tc.getTaskByNumber);
taskRoute.get(	 "/get-by-project-id/:id",	verifyTokenMiddleware, tc.getTasksByProject);
taskRoute.put(	 "/update/:id",				verifyTokenMiddleware, tc.updateTask);
taskRoute.delete("/delete/:id",				verifyTokenMiddleware, tc.deleteTask);
taskRoute.get(	 "/status",					tc.getTaskStatusList);
taskRoute.get(   "/prio",					tc.getTaskPriorityList);


export default taskRoute;