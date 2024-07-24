import IUser from "../Application/Interfaces/User/IUser";

class User implements IUser
{
    _id?: string | undefined;
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    role: string;
    puntuation: number;
    isVerified: boolean;
    verificationToken: string;
    createdAt: Date;
    constructor(id: string, username: string, name: string, lastName: string, email: string, password: string, city: string, role: string, puntuation: number,
        isVerified: boolean, verificationToken: string, createdAt: Date)
    {
        this._id = id;
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.city = city;
        this.role = role;
        this.puntuation = puntuation;
        this.isVerified = isVerified;
        this.verificationToken = verificationToken;
        this.createdAt = createdAt;
    }
    
}
export default User;