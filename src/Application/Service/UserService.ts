import UserCommand from "../../Infrastructure/Command/UserCommand";
import CreateUserDTO from "../DTO/CreateUserDTO";
import UpdateUserDTO from "../DTO/UpdateUserDTO";
import IUser from "../Interfaces/User/IUser";
import IUserService from "../Interfaces/User/IUserService";

const userCommand = new UserCommand();
class UserService implements IUserService
{
    getUserById(id: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    getUsersByRole(role: string): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    getUsersByCity(city: string): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    getUsersByPuntuation(puntuation: number): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    registerUser(userDto: CreateUserDTO): Promise<IUser> {
        const createdUser = userCommand.registerUser(userDto);
        return createdUser;
    }
    updateUser(userDto: UpdateUserDTO): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }    
}
export default UserService;