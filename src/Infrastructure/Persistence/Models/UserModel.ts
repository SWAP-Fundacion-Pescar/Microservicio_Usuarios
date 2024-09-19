import mongoose, { Schema } from "mongoose";
import IUserDocument from "../../Interfaces/IUserDocument";
import bcrypt from 'bcrypt';

const userSchema: Schema<IUserDocument> = new mongoose.Schema
(
    {
        username: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true, default: "member"},
        city: {type: String, required: true},
        puntuation: {type: Number, required: true, default: 0},
        isVerified: {type: Boolean, default: false},
        verificationToken: {type: String},
        profilePictureUrl: {type: String},
        createdAt: {type: Date, default : Date.now}
    }
);
userSchema.pre<IUserDocument>('save', async function (next)
{
    if(!this.isModified('password'))
        {
            return next();
        }
    try
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error)
    {
        next();
    }
});
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};
const UserModel = mongoose.model("User", userSchema);
export default UserModel;