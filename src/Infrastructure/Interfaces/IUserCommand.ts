import CreateUserDTO from "../../DTO/CreateUserDTO";
import UpdatePasswordDTO from "../../DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../../DTO/UpdateUserDTO";
import IUser from "./IUser";

interface IUserCommand
{
    registerUser(userDto: CreateUserDTO): Promise<IUser>;
    verifyEmail(email: string, token: string): Promise<void>;
    updateUser(userDto: UpdateUserDTO): Promise<IUser>;
    updatePassword(userDto: UpdatePasswordDTO): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
}

export default IUserCommand;