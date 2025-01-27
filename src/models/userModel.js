import mongoose from "mongoose";
import MultiLanguage, {msg} from "../utils/multiLanguage.js";
import bcrypt from "bcrypt";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;
const PASSWORD_REGEX = new RegExp(
	"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{"
	+ `${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`);

function messagePasswordRequirements() {
	return lang.tr(msg.PASSWORD_REQUIREMENTS_NOT_MET,
		PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
};

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
        trim: true,
        maxlength: [
            100, lang.tr(msg.FIELD_MAX_LENGTH, lang.tr(msg.USERNAME_FIELD), 
            100)],
    },
    password: {
        type: String,
        required: [true,  lang.tr(msg.FIELD_REQUIRED, lang.tr(msg.PASSWORD_FIELD))],
		validate: {
			validator: v => PASSWORD_REGEX.test(v),
			message: messagePasswordRequirements(),
		},
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
		enum: {
			values: Object.keys(Roles),
			message: lang.tr(msg.INVALID_ROLE)
		},
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", function (next) {
	this.password = bcrypt.hashSync(this.password, 10);
	next();
})

export default mongoose.model("User", userSchema, "users");