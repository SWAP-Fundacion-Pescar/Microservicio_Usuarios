import CreateUserDTO from "../../Application/DTO/CreateUserDTO";
import UpdateUserDTO from "../../Application/DTO/UpdateUserDTO";
import IUser from "../../Application/Interfaces/User/IUser";
import IUserCommand from "../../Application/Interfaces/User/IUserCommand";
import UserModel from "../Persistence/Models/UserModel";

class UserCommand implements IUserCommand
{
    async registerUser(userDto: CreateUserDTO): Promise<IUser> {
        const createdUser = new UserModel(userDto);
        await createdUser.save();
        return createdUser.toObject();
    }
    updateUser(userDto: UpdateUserDTO): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }    
}

export default UserCommand;