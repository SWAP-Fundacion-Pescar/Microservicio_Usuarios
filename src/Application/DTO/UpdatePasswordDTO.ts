class UpdatePasswordDTO
{
    id: string;
    currentPassword: string;
    newPassword: string;
    constructor(id: string, currentPassword: string, newPassword: string)
    {
        this.id = id;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
export default UpdatePasswordDTO;