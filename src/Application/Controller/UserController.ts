import { Response, Request, NextFunction } from 'express';
import IUserService from "../Interfaces/User/IUserService";
import CreateUserDTO from '../DTO/CreateUserDTO';
import UpdateUserDTO from '../DTO/UpdateUserDTO';
import UpdatePasswordDTO from '../DTO/UpdatePasswordDTO';
import CreatedUserResponse from '../Response/CreatedUserResponse';
import LoginDTO from '../DTO/LoginDTO';
import GetUserResponse from '../Response/GetUserResponse';

class UserController
{
    public _userService: IUserService;
    constructor(userService: IUserService)
    {
        this._userService = userService;
        this.registerUser = this.registerUser.bind(this);  
        this.login = this.login.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUsersByRole = this.getUsersByRole.bind(this);
        this.getUsersByCity = this.getUsersByCity.bind(this);
        this.getUsersByPuntuation = this.getUsersByPuntuation.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    public async registerUser( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { username, name, lastName, email, password, city } = req.body;
            const createUserDTO = new CreateUserDTO(username, name, lastName, email, password, city);
            const createdUser = await this._userService.registerUser(createUserDTO);
            const createdUserResponse = new CreatedUserResponse(createdUser);
            res.status(201).json(createdUserResponse);
        }   
        catch (error)
        {
            next(error);
        }
    }
    public async login( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { email, password } = req.body;
            const loginDTO = new LoginDTO( email, password);
            const token = await this._userService.login(loginDTO);
            res.status(200).json(token);
        }   
        catch (error)
        {
            next(error);
        }
    }
    public async getUserById( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const {id} = req.query;
            const retrievedUser = await this._userService.getUserById(id as string);
            const getUserResponse = new GetUserResponse(retrievedUser);
            res.status(200).json(getUserResponse);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async getUsersByRole( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { role } = req.query;
            const retrievedUsers = await this._userService.getUsersByRole(role as string);
            const getUsersResponse: Array<GetUserResponse> = new Array<GetUserResponse>();
            retrievedUsers.forEach(user => {
                const getUserResponse = new GetUserResponse(user);
                getUsersResponse.push(getUserResponse);
            });
            res.status(200).json(getUsersResponse);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async getUsersByCity( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { city } = req.query;
            const retrievedUsers = await this._userService.getUsersByCity(city as string);
            const getUsersResponse: Array<GetUserResponse> = new Array<GetUserResponse>();
            retrievedUsers.forEach(user => {
                const getUserResponse = new GetUserResponse(user);
                getUsersResponse.push(getUserResponse);
            });
            res.status(200).json(getUsersResponse);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async getUsersByPuntuation( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const {puntuation} = req.query;
            const retrievedUsers = await this._userService.getUsersByPuntuation(parseInt(puntuation as string));
            const getUsersResponse: Array<GetUserResponse> = new Array<GetUserResponse>();
            retrievedUsers.forEach(user => {
                const getUserResponse = new GetUserResponse(user);
                getUsersResponse.push(getUserResponse);
            });
            res.status(200).json(getUsersResponse);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async updateUser( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const {id, username, email, password, city} = req.body;
            const updateUserDto = new UpdateUserDTO(id, username, email, password, city);
            const updatedUser = await this._userService.updateUser(updateUserDto);
            res.status(200).json(updatedUser);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async updatePassword( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const {id, currentPassword, newPassword} = req.body;            
            const updatePasswordDto = new UpdatePasswordDTO(id, currentPassword, newPassword);
            const updatedUser = await this._userService.updatePassword(updatePasswordDto);
            const userResponse = new GetUserResponse(updatedUser);
            res.status(201).json(userResponse);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async deleteUser( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { id } = req.query;
            await this._userService.deleteUser(id as string);
            res.status(200).json("Usuario eliminado");
        }
        catch (error)
        {
            next(error);
        }
    }
}
export default UserController;