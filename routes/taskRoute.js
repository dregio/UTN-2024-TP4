import { Router } from 'express';
import { getTasks } from '../controllers/taskController.js';

const taskRoute = Router();

taskRoute.get("/get", (req, res) => {
    res.send("Hello World");
});

export default taskRoute;