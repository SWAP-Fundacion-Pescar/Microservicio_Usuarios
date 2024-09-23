import { Router } from "express";
import UserController from "../Controller/UserController";
import UserService from "../Service/UserService";
import UserMapper from "../Mappers/UserMapper";
import { validateCreateUser, validateLogin, validateUpdatePassword } from "../Middleware/Validator/UserValidator";
import validationErrorHandler from "../Middleware/Validator/ValidationErrorHandler";
import { authenticateJwt } from "../Middleware/passportMiddleware";
import upload from "../../Infrastructure/Config/multerStorage";



const userRouter = Router();
const userService = new UserService();
const userMapper = new UserMapper();
const userController = new UserController(userService, userMapper);
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */
userRouter.post('/users/favorite', authenticateJwt, userController.addFavorite);
userRouter.get('/users/favorite', authenticateJwt, userController.getUserFavorites);
userRouter.delete('/users/favorite', authenticateJwt, userController.deleteFavorite);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatedUserResponse'
 */
userRouter.post('/users/register', validateCreateUser, validationErrorHandler, userController.registerUser);

/**
 * @swagger
 * /api/users/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: User token
 *     responses:
 *       200:
 *         description: User verufued
 *         content:
 *           text/plain:
 *             schema:
 *               type: 'string'
 *               example: 'Verified user'
 */

userRouter.get('/users/verify-email/:token', userController.verifyEmail);
userRouter.put('/users/pfp', authenticateJwt, upload.single('pfp'), userController.addProfilePicture);
/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Login a user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginDTO'
 *    responses:
 *      201:
 *       description: User logged
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: "Hello, World!"
 *      401:
 *       description: Invalid Credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {error: "There was an error"}
 */

userRouter.post('/users/login', validateLogin, validationErrorHandler, userController.login);


/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Get a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      200:
 *        description: A single user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserResponse'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {error: 'There was an error'}
 * 
 */
userRouter.get('/users/:id', userController.getUserById);
/**
 * @swagger
 * /api/users/password:
 *  put:
 *    summary: Update user password
 *    security:
 *      - bearerAuth: []
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdatePasswordDTO'
 *    responses:
 *      201:
 *        description: Password updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserResponse'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              example: {error: Unauthorized}
 */

userRouter.put('/users/password', authenticateJwt, validateUpdatePassword, validationErrorHandler, userController.updatePassword);


/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           text/plain:
 *             schema:
 *               type: 'string'
 *               example: 'Deleted user'
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               example: {error: 'There was an error'}
 */
userRouter.delete('/users/delete', authenticateJwt, userController.deleteUser);

/**
 * @swagger
 * /api/users/role/{role}:
 *  get:
 *    summary: Get users by role
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: role
 *        schema:
 *          type: string
 *        required: true
 *        description: Users role
 *    responses:
 *      200:
 *        description: Users with a particular role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUsersResponse'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {error: 'There was an error'}
 */


userRouter.get('/users/role/:role', userController.getUsersByRole);

/**
 * @swagger
 * /api/users/city/{city}:
 *  get:
 *    summary: Get users by city
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: city
 *        schema:
 *          type: string
 *        required: true
 *        description: Users city
 *    responses:
 *      200:
 *        description: Users within a particular city
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUsersResponse'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {error: 'There was an error'}
 */
userRouter.get('/users/city/:city', userController.getUsersByCity);

/**
 * @swagger
 * /api/users/puntuation/{puntuation}:
 *  get:
 *    summary: Get users by puntuation
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: puntuation
 *        schema:
 *          type: string
 *        required: true
 *        description: Users puntuation
 *    responses:
 *      200:
 *        description: Users with a particular puntuation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUsersResponse'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {error: 'There was an error'}
 */
userRouter.get('/users/puntuation/:puntuation', userController.getUsersByPuntuation);
export default userRouter;