import CreateUserDTO from "../../DTO/CreateUserDTO";
import UpdateUserDTO from "../../DTO/UpdateUserDTO";
import IUser from "./IUser";

interface IUserCommand
{
    registerUser(userDto: CreateUserDTO): Promise<IUser>;
    updateUser(userDto: UpdateUserDTO): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
}

export default IUserCommand;