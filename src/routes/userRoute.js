import { Router } from 'express';
import userCont from '../controllers/userController.js';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';

const userRoute = Router();

userRoute.get(	 "/get",			verifyTokenMiddleware, userCont.getUsers);
userRoute.post(	 "/create",			verifyTokenMiddleware, userCont.createUser);
userRoute.get(	 "/get-by-id/:id",	verifyTokenMiddleware, userCont.getUser);
userRoute.put(	 "/update/:id",		verifyTokenMiddleware, userCont.updateUser);
userRoute.delete("/delete/:id",		verifyTokenMiddleware, userCont.deleteUser);
userRoute.post(	 "/login",			userCont.login);

export default userRoute;