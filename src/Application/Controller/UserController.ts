import { Response, Request, NextFunction } from 'express';
import IUserService from "../Interfaces/User/IUserService";
import CreateUserDTO from '../DTO/CreateUserDTO';

class UserController
{
    public _userService: IUserService;
    constructor(userService: IUserService)
    {
        this._userService = userService;
        this.registerUser = this.registerUser.bind(this);  
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
}
export default UserController;