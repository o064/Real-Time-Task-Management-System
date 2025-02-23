const mongoose = require('mongoose');
const _ = require('lodash');
const textRegex = /^[A-Za-z0-9\s.,!?()-]{3,}$/;
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim:true,
        match:textRegex,
        unique: [true, "Title must be unique"]
    },
    description: { 
        type: String,
        required: true,
        match: textRegex
    }
    ,
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{
    toJSON:{
        transform: (doc,retuDoc)=> _.omit(retuDoc,['__v','_id'])
    }
}
,{timestamps:true});

const Task = mongoose.model("Item", TaskSchema);

module.exports = Task;
