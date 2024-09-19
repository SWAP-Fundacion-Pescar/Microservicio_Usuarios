import mongoose, { Schema, Document } from 'mongoose';

interface IUserDocument extends Document {
    _id: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    role: string;
    puntuation: number;
    isVerified: boolean;
    verificationToken: string;
    profilePictureUrl: string;
    createdAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}
export default IUserDocument;