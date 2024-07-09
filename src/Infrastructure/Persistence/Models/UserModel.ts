import mongoose from "mongoose";

const userSchema = new mongoose.Schema
(
    {
        username: {type: String,required: true},
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, required: true, default: "member"},
        city: {type: String, required: true},
        puntuation: {type: Number, required: true, default: 0},
    }
);
const UserModel = mongoose.model("User", userSchema);
export default UserModel;