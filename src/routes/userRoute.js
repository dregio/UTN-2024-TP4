import { Router } from 'express';
import uc from '../controllers/userController.js';

const userRoute = Router();

userRoute.get("/get", uc.getUsers);
userRoute.post("/create", uc.createUser);

export default userRoute;