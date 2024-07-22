class CreateUserDTO
{
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    verificationToken?: string;
    constructor(username: string, name: string, lastName: string, email: string, password: string, city: string)
    {
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.city = city;
    }
}
export default CreateUserDTO;