import mongoose from "mongoose";

const TaskStatus = Object.freeze({
    NOT_STARTED: "Not started",
    STARTED: "Started",
    FINISHED: "Finished"
});

const TaskPrio = Object.freeze({
    0: "N/A",
    1: "1",
    2: "2",
    3: "3"
});

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
        default: "NOT STARTED",
        enum: Object.keys(TaskStatus),
        validate: {
            validator: function (v) {
                return Object.keys(TaskStatus).includes(v);
            },
            message: props => `${props.value} is not a valid task status`
        }
    },
    priority: {
        type: Number,
        required: true,
        default: 0,
        enum: Object.keys(TaskPrio),
        validate: {
            validator: function (v) {
                return Object.keys(TaskPrio).includes(v);
            },
            message: props => `${props.value} is not a valid task priority`
        }
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    modified_at: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        default: "https://picsum.photos/200"    // TODO2: pasar a Project.
    }
})

export default mongoose.model("Task", taskSchema, "tasks");