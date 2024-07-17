import UserCommand from "../../Infrastructure/Command/UserCommand";
import UserQuery from "../../Infrastructure/Query/UserQuery";
import CreateUserDTO from "../DTO/CreateUserDTO";
import LoginDTO from "../DTO/LoginDTO";
import UpdatePasswordDTO from "../DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../DTO/UpdateUserDTO";
import ValidationException from "../Exceptions/ValidationException";
import IUser from "../Interfaces/User/IUser";
import IUserService from "../Interfaces/User/IUserService";
import jwt from 'jsonwebtoken';

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
        const createdUser = await userCommand.registerUser(userDto);
        return createdUser;
    }
    async login(loginDto: LoginDTO): Promise<string>
    {
        const retrievedUser = await userQuery.getUserByEmail(loginDto.email);
        const isMatch = await retrievedUser.comparePassword(loginDto.password);
        if(!isMatch){throw new ValidationException("Credenciales invalidas")};
        const payload = { id: retrievedUser.id};
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'});
        return token;
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