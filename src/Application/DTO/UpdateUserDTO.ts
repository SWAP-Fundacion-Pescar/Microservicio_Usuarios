class UpdateUserDTO
{
    id: string
    username: string;
    email: string;
    password: string;
    city: string;
    constructor(id: string, username: string, email: string, password: string, city: string)
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.city = city;
    };
}
export default UpdateUserDTO;