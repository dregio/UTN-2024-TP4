import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    // campo _id: es generado por mongoDB
    number: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    title: {
        type: String,
        required: [true, "Task title is required"],
        unique: true,
        trim: true,
        maxlength: [100, "Task title cannot be more than 100 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, "Task description cannot be more than 1000 characters"],
    },
    started_at: {
        type: Date,
    },
    finished_at: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        default: "not started"
    },
    priority: {
        type: Number,
        required: true,
        default: 3
    },
    project_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    
})