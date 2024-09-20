interface IUser
{
    _id?: string,
    username: string,
    name: string, 
    lastName: string,
    email: string,
    password: string,
    city: string,
    role: string,
    puntuation: number,
    isVerified: boolean,
    verificationToken: string,
    profilePictureUrl: string,
    createdAt: Date,
}

export default IUser;