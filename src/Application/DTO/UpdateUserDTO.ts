class UpdateUserDTO
{
    id: string
    username: string;
    name: string;
    lastName: string;
    city: string;
    constructor(id: string, username: string, name: string, lastName: string, city: string)
    {
        this.id = id;
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.city = city;
    };
}
export default UpdateUserDTO;