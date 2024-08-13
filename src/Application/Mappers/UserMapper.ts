import CreateUserDTO from "../DTO/CreateUserDTO";
import LoginDTO from "../DTO/LoginDTO";
import UpdatePasswordDTO from "../DTO/UpdatePasswordDTO";
import IUser from "../Interfaces/User/IUser";
import CreatedUserResponse from "../Response/CreatedUserResponse";
import GetUserResponse from "../Response/GetUserResponse";
import { Request } from "express";

class UserMapper
{

    public CreateCreateUserDTO(req: Request): CreateUserDTO
    {
        const { username, name, lastName, email, password, city } = req.body;
        const createdUserDto = new CreateUserDTO(username, name, lastName, email, password, city);
        return createdUserDto;
    }
    public CreateLoginDTO(req: Request): LoginDTO
    {
        const { email, password } = req.body;
        const loginDto = new LoginDTO( email, password);
        return loginDto
    }
    public CreateUpdatePasswordDTO(req: Request, id: string): UpdatePasswordDTO
    {
        const {currentPassword, newPassword} = req.body;            
        const updatePasswordDto = new UpdatePasswordDTO(id, currentPassword, newPassword);
        return updatePasswordDto;
    }

    public CreateCreatedUserResponse(user: IUser): CreatedUserResponse
    {
        const createdUserResponse = new CreatedUserResponse(user);
        return createdUserResponse;
    }
    public CreateGetUserResponse(user: IUser): GetUserResponse
    {
        const createdGetUserResponse = new GetUserResponse(user);
        return createdGetUserResponse;
    }
    public CreateGetUsersResponse(users: Array<IUser>): Array<GetUserResponse>
    {
        const createdGetUsersResponses: Array<GetUserResponse> = new Array<GetUserResponse>();
        users.forEach(user => {
            const getUserResponse = new GetUserResponse(user);
            createdGetUsersResponses.push(getUserResponse);
        });
        return createdGetUsersResponses;
    }
}

export default UserMapper;