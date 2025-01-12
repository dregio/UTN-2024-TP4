import mongoose from "mongoose";

const Roles = Object.freeze({
    USER: "User",
    ADMIN: "Administrator",
    PM: "Project manager"
});

const userSchema = mongoose.Schema({
    // campo _id: es generado por mongoDB
    name: {
        type: String,
        required: [true, "User name is required"],
        unique: true,
        trim: true,
        maxlength: [100, "User name cannot be more than 30 characters"],
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        trim: true,
        maxlength: [100, "User password cannot be more than 100 characters"],
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        trim: true,
        maxlength: [100, "User email cannot be more than 100 characters"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: Object.keys(Roles),
        validate: {
            validator: function (v) {
                return Object.keys(Roles).includes(v);
            },
            message: props => `${props.value} is not a valid role`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema, "users");