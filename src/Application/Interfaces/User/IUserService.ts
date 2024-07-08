import CreateUserDTO from "../../DTO/CreateUserDTO";
import UpdateUserDTO from "../../DTO/UpdateUserDTO";
import IUser from "./IUser";
interface IUserService
{
    getUserById(id: string): Promise<IUser>;
    getUsersByRole(role: string): Promise<IUser[]>;
    getUsersByCity(city: string): Promise<IUser[]>;
    getUsersByPuntuation(puntuation: number): Promise<IUser[]>;
    
    registerUser(userDto: CreateUserDTO): Promise<IUser>;
    updateUser(userDto: UpdateUserDTO): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
};
export default IUserService;