import { Router } from 'express';
import { getTasks } from '../controllers/taskController.js';

const taskRoute = Router();

taskRoute.get("/get", getTasks);

export default taskRoute;