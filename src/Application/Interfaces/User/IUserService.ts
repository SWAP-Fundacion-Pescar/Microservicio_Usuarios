import CreateUserDTO from "../../DTO/CreateUserDTO";
import UpdatePasswordDTO from "../../DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../../DTO/UpdateUserDTO";
import IUser from "./IUser";
interface IUserService
{
    getUserById(id: string): Promise<IUser>;
    getUsersByRole(role: string): Promise<IUser[]>;
    getUsersByCity(city: string): Promise<IUser[]>;
    getUsersByPuntuation(puntuation: number): Promise<IUser[]>;
    
    registerUser(userDto: CreateUserDTO): Promise<IUser>;
    login(email: string, password: string): Promise<string>;
    updateUser(userDto: UpdateUserDTO): Promise<IUser>;
    updatePassword(userDto: UpdatePasswordDTO): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
};
export default IUserService;