class AddProfilePictureDTO
{
    userId: string;
    url: string;
    constructor(userId: string, url: string)
    {
        this.userId = userId;
        this.url = url;
    }
}
export default AddProfilePictureDTO;