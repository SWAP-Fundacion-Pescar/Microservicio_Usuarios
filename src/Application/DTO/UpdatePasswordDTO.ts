class UpdatePasswordDTO
{
    id: string;
    oldPassword: string;
    newPassword: string;
    constructor(id: string, oldPassword: string, newPassword: string)
    {
        this.id = id;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
export default UpdatePasswordDTO;