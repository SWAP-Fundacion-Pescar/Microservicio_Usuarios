class UpdateUserDTO
{
    username: string;
    email: string;
    password: string;
    city: string;
    constructor(username: string, email: string, password: string, city: string)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.city = city;
    };
}
export default UpdateUserDTO;