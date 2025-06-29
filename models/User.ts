import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    credits?: number;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Basic email validation regex
    },
    credits: {
        type: Number,
        default: 0, // Default credits to 0
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;