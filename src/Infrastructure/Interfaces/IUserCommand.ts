import AddProfilePictureDTO from "../../Application/DTO/AddProfilePictureDTO";
import CreateUserDTO from "../../Application/DTO/CreateUserDTO";
import UpdatePasswordDTO from "../../Application/DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../../Application/DTO/UpdateUserDTO";
import IUser from "../../Application/Interfaces/User/IUser";


interface IUserCommand
{
    registerUser(userDto: CreateUserDTO): Promise<IUser>;
    verifyEmail(email: string, token: string): Promise<void>;
    addProfilePicture(addProfilePictureDTO: AddProfilePictureDTO): Promise<string>;
    updateUser(userDto: UpdateUserDTO): Promise<IUser>;
    updatePassword(userDto: UpdatePasswordDTO): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
}

export default IUserCommand;