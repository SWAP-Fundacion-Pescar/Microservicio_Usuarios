import IUserDocument from "../../../Infrastructure/Interfaces/IUserDocument";

interface IUserQuery
{
    getUserById(id: string): Promise<IUserDocument>;
    getUserByUsername(username: string): Promise<IUserDocument>;
    getUserByEmail(email: string): Promise<IUserDocument>;
    getUsersByRole(role: string): Promise<IUserDocument[]>;
    getUsersByCity(city: string): Promise<IUserDocument[]>;
    getUsersByPuntuation(puntuation: number): Promise<IUserDocument[]>;
    getUserFavorites(userId: string): Promise<Array<string>>;
};
export default IUserQuery;