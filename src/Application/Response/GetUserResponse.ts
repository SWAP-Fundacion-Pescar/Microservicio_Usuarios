import IUser from "../Interfaces/User/IUser";

class GetUserResponse {
    id?: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
    city: string;
    role: string;
    puntuation: number;
    profilePictureUrl: string;
    constructor(user: IUser){
        this.id = user._id;
        this.username = user.username;
        this.name = user.name;
        this.lastName = user.lastName;
        this.email = user.email;
        this.city = user.city;
        this.role = user.role;
        this.puntuation = user.puntuation
        this.profilePictureUrl = user.profilePictureUrl;
    }
}
export default GetUserResponse;