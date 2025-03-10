import { Response, Request, NextFunction } from 'express';
import IUserService from "../Interfaces/User/IUserService";
import UpdateUserDTO from '../DTO/UpdateUserDTO';
import GetUserResponse from '../Response/GetUserResponse';
import UserMapper from '../Mappers/UserMapper';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import AddProfilePictureDTO from '../DTO/AddProfilePictureDTO';
interface User
{
    id: string;
}
cloudinary.config({
    cloud_name: 'dojyoiv2g',
    api_key: '913584591931997',
    api_secret: 'RP5zkiAoI5EQX4Mg36_97pgndsI',
});
class UserController
{
    public _userService: IUserService;
    public _userMapper: UserMapper
    constructor(userService: IUserService, userMapper: UserMapper)
    {
        this._userService = userService;
        this._userMapper = userMapper;
        this.registerUser = this.registerUser.bind(this);  
        this.login = this.login.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUsersByRole = this.getUsersByRole.bind(this);
        this.getUsersByCity = this.getUsersByCity.bind(this);
        this.getUsersByPuntuation = this.getUsersByPuntuation.bind(this);
        this.addProfilePicture = this.addProfilePicture.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    public async registerUser( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const createUserDto = this._userMapper.CreateCreateUserDTO(req);
            const createdUser = await this._userService.registerUser(createUserDto);
            const createdUserResponse = this._userMapper.CreateCreatedUserResponse(createdUser);            
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
            const loginDto = this._userMapper.CreateLoginDTO(req);
            const response = await this._userService.login(loginDto);
            res.status(200).json(response);
        }   
        catch (error)
        {
            next(error);
        }
    }
    public async verifyEmail( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { token } = req.params;
            await this._userService.verifyEmail(token as string);
            res.status(200).send('Email verificado exitosamente')
        }
        catch(error)
        {
            next(error);
        }
    }
    public async getUserById( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const {id} = req.params;
            const retrievedUser = await this._userService.getUserById(id as string);
            const getUserResponse = this._userMapper.CreateGetUserResponse(retrievedUser);
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
            const { role } = req.params;
            const retrievedUsers = await this._userService.getUsersByRole(role as string);
            const getUsersResponse: Array<GetUserResponse> = this._userMapper.CreateGetUsersResponse(retrievedUsers);
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
            const { city } = req.params;
            const retrievedUsers = await this._userService.getUsersByCity(city as string);
            const getUsersResponse: Array<GetUserResponse> = this._userMapper.CreateGetUsersResponse(retrievedUsers);
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
            const {puntuation} = req.params;
            const retrievedUsers = await this._userService.getUsersByPuntuation(parseInt(puntuation as string));
            const getUsersResponse: Array<GetUserResponse> = this._userMapper.CreateGetUsersResponse(retrievedUsers);
            res.status(200).json(getUsersResponse);
        }
        catch (error)
        {
            next(error);
        }
    }
    public async addProfilePicture(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as User;
            const result = await new Promise((resolve, reject) => {
                if (!req.file) throw new Error("File not found")
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'pfp' },  // Cloudinary folder
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                // Stream the file's buffer to Cloudinary
                streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
            });

            // Respond with the secure URL of the uploaded file
            const url = (result as any).secure_url;
            const addProfilePictureDTO = new AddProfilePictureDTO(user.id, url);
            const response = await this._userService.addProfilePicture(addProfilePictureDTO);
            res.status(201).send(response);
        }
        catch (error) {
            next(error);

        }
    }
    public async updateUser( req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const user = req.user as User;
            const {username, name, lastName, city} = req.body;
            const updateUserDto = new UpdateUserDTO(user.id, username, name, lastName, city);
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
            const user = req.user as User;
            const updatePasswordDto = this._userMapper.CreateUpdatePasswordDTO(req, user.id);            
            const updatedUser = await this._userService.updatePassword(updatePasswordDto);
            const userResponse = this._userMapper.CreateCreatedUserResponse(updatedUser);
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
            const user = req.user as User;
            await this._userService.deleteUser(user.id as string);
            res.status(200).json("Usuario eliminado");
        }
        catch (error)
        {
            next(error);
        }
    }
}
export default UserController;