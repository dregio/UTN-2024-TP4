import mongoose from "mongoose";
import MultiLanguage, {msg} from "../utils/multiLanguage.js";

const Roles = Object.freeze({
    USER: "User",
    ADMIN: "Administrator",
    PM: "Project manager"
});

const lang = new MultiLanguage();

const userSchema = mongoose.Schema({
    
    // campo _id: es generado por mongoDB
    name: {
        type: String,
        required: [true, lang.tr(msg.FIELD_REQUIRED, lang.tr(msg.USERNAME_FIELD))],
        unique: true,
        trim: true,
        maxlength: [
            100, lang.tr(msg.FIELD_MAX_LENGTH, lang.tr(msg.USERNAME_FIELD), 
            100)],
    },
    password: {
        type: String,
        required: [true,  lang.tr(msg.FIELD_REQUIRED, lang.tr(msg.PASSWORD_FIELD))],
        trim: true,
        maxlength: [
            30, lang.tr(msg.FIELD_MAX_LENGTH, lang.tr(msg.PASSWORD_FIELD), 
            30)],
    },
    email: {
        type: String,
        required: [true, lang.tr(msg.FIELD_REQUIRED, lang.tr(msg.EMAIL_FIELD))],
        unique: true,
        trim: true,
        maxlength: [
            100, lang.tr(msg.FIELD_MAX_LENGTH, lang.tr(msg.EMAIL_FIELD), 
            100)],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
            },
            message: lang.tr(msg.INVALID_EMAIL)
        }
    },
    role: {
        type: String,
        required: true,
        default: "USER",
        enum: Object.keys(Roles),
        validate: {
            validator: function (v) {
                return Object.keys(Roles).includes(v);
            },
            message: lang.tr(msg.INVALID_ROLE)
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema, "users");