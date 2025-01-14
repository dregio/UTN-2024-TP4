import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController.js';

const userRoute = Router();

userRoute.get("/get", getUsers);
userRoute.post("/create", createUser);

export default userRoute;