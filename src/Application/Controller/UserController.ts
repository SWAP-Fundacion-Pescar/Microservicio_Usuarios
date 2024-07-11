import { Response, Request, NextFunction } from 'express';
import IUserService from "../Interfaces/User/IUserService";
import CreateUserDTO from '../DTO/CreateUserDTO';
import UpdateUserDTO from '../DTO/UpdateUserDTO';
import UpdatePasswordDTO from '../DTO/UpdatePasswordDTO';

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
            res.status(201).json(createdUser);
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
            const token = await this._userService.login(email, password);
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
            const id = req.query.id as string;
            const retrievedUser = await this._userService.getUserById(id);
            res.status(200).json(retrievedUser);
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
            const role = req.query.role as string;
            const retrievedUser = await this._userService.getUsersByRole(role);
            res.status(200).json(retrievedUser);
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
            const city = req.query.city as string;
            const retrievedUser = await this._userService.getUsersByCity(city);
            res.status(200).json(retrievedUser);
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
            const puntuation = parseInt(req.query.puntuation as string);
            const retrievedUser = await this._userService.getUsersByPuntuation(puntuation);
            res.status(200).json(retrievedUser);
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
            const {id, oldPassword, newPassword} = req.body;
            const updatePasswordDto = new UpdatePasswordDTO(id, oldPassword, newPassword);
            const updatedUser = await this._userService.updatePassword(updatePasswordDto);
            res.status(200).json(updatedUser);
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
            const id = req.query.id as string;
            await this._userService.deleteUser(id);
            res.status(200).json("Usuario eleminado");
        }
        catch (error)
        {
            next(error);
        }
    }
}
export default UserController;