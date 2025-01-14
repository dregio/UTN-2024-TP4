import { Router } from 'express';
import tc from '../controllers/taskController.js';

const taskRoute = Router();

taskRoute.get("/get", tc.getTasks);

//endpoint exclusivo para obtener los status disponibles
taskRoute.get("/status", tc.getTaskStatusList); // TODO2: Agregar verifyTokenMiddleware
taskRoute.get("/prio", getTaskPriorityList); // ACÁ también.
taskRoute.post("/create", createTask);
taskRoute.get("/get-by-id/:id", findTaskById); // ACÁ también.
taskRoute.post("/get-by-name",  findTaskByName); // ACÁ también.
taskRoute.put("/update/:id", updateTask)
taskRoute.delete("/delete/:id", deleteTask)

export default taskRoute;