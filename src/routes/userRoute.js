import { Router } from 'express';
import uc from '../controllers/userController.js';

const userRoute = Router();

userRoute.get("/get", uc.getUsers);
userRoute.post("/create", uc.createUser);
userRoute.get("/get-by-id/:id", uc.getUser);
userRoute.put("/update/:id", uc.updateUser);
userRoute.delete("/delete/:id", uc.deleteUser);

export default userRoute;