import { Router } from 'express';
import tc from '../controllers/taskController.js';

const taskRoute = Router();

taskRoute.get("/get", tc.getTasks);

//endpoint exclusivo para obtener los status disponibles
taskRoute.get("/status", tc.getTaskStatusList); // TODO2: Agregar verifyTokenMiddleware
taskRoute.get("/prio", tc.getTaskPriorityList); // ACÁ también.
taskRoute.post("/create", tc.createTask);
taskRoute.get("/get-by-id/:id", tc.getTask); // ACÁ también.
taskRoute.put("/update/:id", tc.updateTask)
taskRoute.delete("/delete/:id", tc.deleteTask)

export default taskRoute;