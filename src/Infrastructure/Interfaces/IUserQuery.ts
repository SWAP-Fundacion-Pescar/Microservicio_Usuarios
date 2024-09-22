import IUserDocument from "./IUserDocument";

interface IUserQuery
{
    getUserById(id: string): Promise<IUserDocument>;
    getUserByUsername(username: string): Promise<IUserDocument>;
    getUserByEmail(email: string): Promise<IUserDocument>;
    getUsersByRole(role: string): Promise<IUserDocument[]>;
    getUsersByCity(city: string): Promise<IUserDocument[]>;
    getUsersByPuntuation(puntuation: number): Promise<IUserDocument[]>;
};
export default IUserQuery;