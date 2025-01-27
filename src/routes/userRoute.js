import { Router } from 'express';
import userCont from '../controllers/userController.js';
import verifyTkn from '../middlewares/verifyTokenMiddleware.js';

const userRoute = Router();

userRoute.get(	 "/get",			verifyTkn,  userCont.getUsers);
// TODO1: La  ruta /user/create se deja sin protección para permitir crear usuarios para probar la aplicación.
userRoute.post(	 "/create",		/*	verifyTkn,*/userCont.createUser); 
userRoute.get(	 "/get-by-id/:id",	verifyTkn,  userCont.getUser);
userRoute.put(	 "/update/:id",		verifyTkn,  userCont.updateUser);
userRoute.delete("/delete/:id",		verifyTkn,  userCont.deleteUser);
userRoute.post(	 "/login",						userCont.login);

export default userRoute;