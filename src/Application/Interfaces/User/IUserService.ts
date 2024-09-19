import CreateUserDTO from "../../DTO/CreateUserDTO";
import LoginDTO from "../../DTO/LoginDTO";
import UpdatePasswordDTO from "../../DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../../DTO/UpdateUserDTO";
import LoginResponse from "../../Response/LoginResponse";
import IUser from "./IUser";
interface IUserService
{
    getUserById(id: string): Promise<IUser>;
    getUsersByRole(role: string): Promise<IUser[]>;
    getUsersByCity(city: string): Promise<IUser[]>;
    getUsersByPuntuation(puntuation: number): Promise<IUser[]>;
    
    registerUser(userDto: CreateUserDTO): Promise<IUser>;
    login(loginDto: LoginDTO): Promise<LoginResponse>;
    verifyEmail(token: string): Promise<void>;
    updateUser(userDto: UpdateUserDTO): Promise<IUser>;
    updatePassword(userDto: UpdatePasswordDTO): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
};
export default IUserService;