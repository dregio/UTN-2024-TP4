import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    // campo _id: es generado por mongoDB
    name: {
        type: String,
        required: [true, "Project name is required"],
        unique: true,
        trim: true,
        maxlength: [100, "Project name cannot be more than 100 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, "Project description cannot be more than 1000 characters"],
    },
    picture: {
        type: String,
        default: "https://picsum.photos/200"
    }
})

export default mongoose.model("Project", projectSchema, "projects");