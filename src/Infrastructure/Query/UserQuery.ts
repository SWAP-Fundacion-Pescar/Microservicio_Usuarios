import NotFoundException from "../../Application/Exceptions/NotFoundException";
import IUserDocument from "../Interfaces/IUserDocument";
import IUserQuery from "../Interfaces/IUserQuery";
import UserModel from "../Persistence/Models/UserModel";

class UserQuery implements IUserQuery
{
    async getUserFavorites(userId: string): Promise<Array<string>> {
        const retrievedUser = await UserModel.findById(userId);
        if(!retrievedUser) throw new NotFoundException('Usuario no encontrado');
        return retrievedUser.favorites;
    }
    async getUserById(id: string): Promise<IUserDocument> {
        const retrievedUser = await UserModel.findOne({_id: id});
        if(!retrievedUser){throw new NotFoundException("Usuario no encontrado")};
        return retrievedUser;
    }
    async getUserByUsername(username: string): Promise<IUserDocument>
    {
        const retrievedUser = await UserModel.findOne({username: username});
        if(!retrievedUser){throw new NotFoundException("Usuario no encontrado")};
        return retrievedUser;
    }
    async getUserByEmail(email: string): Promise<IUserDocument> {
        const retrievedUser = await UserModel.findOne({email: email});
        if(!retrievedUser){ throw new NotFoundException("Usuario no encontrado")};
        return retrievedUser;
    }
    async getUsersByRole(role: string): Promise<IUserDocument[]> {
        const retrievedUsers = await UserModel.find({role: role});
        return retrievedUsers;
    }
    async getUsersByCity(city: string): Promise<IUserDocument[]> {
        const retrievedUsers = await UserModel.find({city: city});
        return retrievedUsers;
    }
    async getUsersByPuntuation(puntuation: number): Promise<IUserDocument[]> {
        const retrievedUsers = await UserModel.find({puntuation: puntuation});
        return retrievedUsers;
    }    
}
export default UserQuery;