import { Router } from "express";
import UserController from "../Controller/UserController";
import UserService from "../Service/UserService";


const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);
userRouter.post('/user/register', userController.registerUser);

export default userRouter;