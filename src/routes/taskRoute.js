import { Router } from 'express';
import tc from '../controllers/taskController.js';

const taskRoute = Router();

taskRoute.get("/get", tc.getTasks);
taskRoute.post("/create", tc.createTask);
taskRoute.get("/get-by-id/:id", tc.getTask); // ACÁ también.
taskRoute.get("/get-by-number/:number", tc.getTaskByNumber);
taskRoute.get("/get-by-project-id/:id", tc.getTasksByProject);
taskRoute.put("/update/:id", tc.updateTask);
taskRoute.delete("/delete/:id", tc.deleteTask);
taskRoute.get("/status", tc.getTaskStatusList); // TODO2: Agregar verifyTokenMiddleware
taskRoute.get("/prio", tc.getTaskPriorityList); // ACÁ también.


export default taskRoute;