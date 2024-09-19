import UserCommand from "../../Infrastructure/Command/UserCommand";
import sendVerificationEmail from "../../Infrastructure/Config/Mail";
import UserQuery from "../../Infrastructure/Query/UserQuery";
import CreateUserDTO from "../DTO/CreateUserDTO";
import LoginDTO from "../DTO/LoginDTO";
import UpdatePasswordDTO from "../DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../DTO/UpdateUserDTO";
import UnauthorizedException from "../Exceptions/UnauthorizedException";
import ValidationException from "../Exceptions/ValidationException";
import IUser from "../Interfaces/User/IUser";
import IUserService from "../Interfaces/User/IUserService";
import jwt from 'jsonwebtoken';
import LoginResponse from "../Response/LoginResponse";
import AddProfilePictureDTO from "../DTO/AddProfilePictureDTO";

const JWT_SECRET = 'your_very_secure_and_long_random_string';

const userCommand = new UserCommand();
const userQuery = new UserQuery();
class UserService implements IUserService
{
    async getUserById(id: string): Promise<IUser> {
        const retrievedUser = await userQuery.getUserById(id);
        return retrievedUser;
    }
    async getUsersByRole(role: string): Promise<IUser[]> {
        const retrievedUser = await userQuery.getUsersByRole(role);
        return retrievedUser;
    }
    async getUsersByCity(city: string): Promise<IUser[]> {
        const retrievedUser = await userQuery.getUsersByCity(city);
        return retrievedUser;
    }
    async getUsersByPuntuation(puntuation: number): Promise<IUser[]> {
        const retrievedUser = await userQuery.getUsersByPuntuation(puntuation);
        return retrievedUser;
    }
    async registerUser(userDto: CreateUserDTO): Promise<IUser> {
        const userEmail = userDto.email
        const verificationToken = jwt.sign({userEmail}, JWT_SECRET, { expiresIn: '1d' });
        userDto.verificationToken = verificationToken;
        userDto.profilePictureUrl = 'https://res.cloudinary.com/dojyoiv2g/image/upload/v1726535174/pfp/agjserzhopqxk1xxka0c.webp';
        const createdUser = await userCommand.registerUser(userDto);
        sendVerificationEmail(createdUser.email, createdUser.verificationToken)
        return createdUser;
    }
    async login(loginDto: LoginDTO): Promise<LoginResponse>
    {
        const retrievedUser = await userQuery.getUserByEmail(loginDto.email);
        const isMatch = await retrievedUser.comparePassword(loginDto.password);
        if(!isMatch){throw new ValidationException("Credenciales invalidas")};
        const payload = { id: retrievedUser.id};
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'});
        const loginResponse = new LoginResponse(token, retrievedUser.id)
        return loginResponse;
    }
    async verifyEmail(token: string): Promise<void> 
    {
        
        if(!token)
            {
                throw new Error('Invalid token');
            }
        jwt.verify(token, JWT_SECRET, async function(err, decoded)
        {
            if(err)
                {
                    throw new UnauthorizedException('Invalid token');
                }                  
            if(typeof decoded == 'object' && 'userEmail' in decoded)
                {
                    await userCommand.verifyEmail(decoded.userEmail, token);
                }
            else
            {
                throw new Error('Invalid token');
            }            
        })
    }
    async addProfilePicture(addProfilePictureDTO: AddProfilePictureDTO): Promise<string>
    {
        const retrievedUrl = await userCommand.addProfilePicture(addProfilePictureDTO);
        return retrievedUrl;
    }
    async updateUser(userDto: UpdateUserDTO): Promise<IUser> {
        const updatedUser = await userCommand.updateUser(userDto);
        return updatedUser;
    }
    async updatePassword(userDto: UpdatePasswordDTO): Promise<IUser> {
        const retrievedUser = await userQuery.getUserById(userDto.id);
        const isMatch = await retrievedUser.comparePassword(userDto.currentPassword);
        if(!isMatch){throw new ValidationException("Credenciales invalidas")};
        const updatedUser = await userCommand.updatePassword(userDto);
        return updatedUser;
    }
    async deleteUser(id: string): Promise<void> {
        await userCommand.deleteUser(id);
    }    
}
export default UserService;