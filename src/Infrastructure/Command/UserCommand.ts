import AddProfilePictureDTO from "../../Application/DTO/AddProfilePictureDTO";
import CreateUserDTO from "../../Application/DTO/CreateUserDTO";
import UpdatePasswordDTO from "../../Application/DTO/UpdatePasswordDTO";
import UpdateUserDTO from "../../Application/DTO/UpdateUserDTO";
import NotFoundException from "../../Application/Exceptions/NotFoundException";
import IUser from "../../Application/Interfaces/User/IUser";
import IUserCommand from "../Interfaces/IUserCommand";
import IUserDocument from "../Interfaces/IUserDocument";
import UserModel from "../Persistence/Models/UserModel";
import bcrypt from 'bcrypt';
class UserCommand implements IUserCommand
{
    async addFavorite(userId: string, clotheId: string): Promise<string> {
        const retrievedUser = await UserModel.findById(userId);
        if(!retrievedUser) throw new NotFoundException('Usuario no encontrado');
        retrievedUser.favorites.push(clotheId);
        await retrievedUser.save();
        return clotheId;
    }
    async deleteFavorite(userId: string, clotheId: string): Promise<string> {
        const retrievedUser = await UserModel.updateOne(
            { _id: userId }, 
            { $pull: { favorites: clotheId } } 
        );
        return clotheId;
    }
    
    async registerUser(userDto: CreateUserDTO): Promise<IUser> 
    {
        const createdUser = new UserModel(userDto);
        await createdUser.save();
        return createdUser.toObject();                        
    }
    async verifyEmail(email: string, token: string): Promise<void> 
    {
        const verifiedUser = await UserModel.findOneAndUpdate({email: email, verificationToken: token}, {isVerified: true, verificationToken: null}, { new: true});
        if(!verifiedUser){ throw new NotFoundException('Usuario no encontrado') };
        await verifiedUser.save();
    }
    async addProfilePicture(addProfilePictureDTO: AddProfilePictureDTO): Promise<string> {
        const retrievedUser = await UserModel.findById(addProfilePictureDTO.userId);
        if(!retrievedUser) throw new NotFoundException('Usuario no encontrado');
        retrievedUser.profilePictureUrl = addProfilePictureDTO.url;
        await retrievedUser.save();
        return retrievedUser.profilePictureUrl
    }
    async updateUser(userDto: UpdateUserDTO): Promise<IUser> 
    {
        const updatedUser = await UserModel.findByIdAndUpdate(userDto.id, 
            {
                username: userDto.username,
                email: userDto.email,
                password: userDto.password,
                city: userDto.city,            
            });      
        if(!updatedUser){ throw new NotFoundException("Usuario no encontrado")};
        return updatedUser;
    }
    async updatePassword(userDto: UpdatePasswordDTO): Promise<IUserDocument> 
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userDto.newPassword, salt);
        const updatedUser = await UserModel.findByIdAndUpdate(userDto.id, {password: hashedPassword});
        if(!updatedUser){throw new NotFoundException("Usuario no encontrado")};
        return updatedUser;
    }
    async deleteUser(id: string): Promise<void> 
    {
        await UserModel.deleteOne({_id: id});
    }    
}

export default UserCommand;