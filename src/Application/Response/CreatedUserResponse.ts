import IUser from "../Interfaces/User/IUser";
class CreatedUserResponse
{
    id?: string;
    username: string;
    constructor(user: IUser)
    {
        this.id = user._id;
        this.username = user.username
    }
}
export default CreatedUserResponse;