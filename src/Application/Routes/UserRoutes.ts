import { Router } from "express";
import UserController from "../Controller/UserController";
import UserService from "../Service/UserService";


const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);
userRouter.post('/user/register', userController.registerUser);
userRouter.post('/user/login', userController.login);
userRouter.get('/user', userController.getUserById);
userRouter.put('/user/update', userController.updateUser);
userRouter.put('/user/password', userController.updatePassword);
userRouter.delete('/user/delete', userController.deleteUser);
userRouter.get('/user/role', userController.getUsersByRole);
userRouter.get('/user/city', userController.getUsersByCity);
userRouter.get('/user/puntuation', userController.getUsersByPuntuation);
export default userRouter;