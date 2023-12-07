import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be at least 8 character long"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },

}, {timestamps: true});

userSchema.pre<IUser>("save", async function(next) {
    // if(!this.isModified('password')) {
    //     next();
    // }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.SignAccessToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_SECRET || "");
}

userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({id: this._id}, process.env.REFRESH_SECRET || "");
}

const userModel: Model<IUser> = model("User", userSchema);

export default userModel;