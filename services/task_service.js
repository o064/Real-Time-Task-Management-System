const Task = require('../database/models/Task');
// Get a task by ID
const getTask =  async (taskId) => {
    const task = await Task.findById(mongoose.Types.ObjectId(taskId));
    if (!task) throw new Error('Task not found');
    return task;
}

// Update a task
const updateTask = async (taskId, title, description, status) => {
    const task = await Task.findByIdAndUpdate(
        mongoose.Types.ObjectId(taskId),
        { title, description, status, updatedAt: Date.now() },
        { new: true }
    );
    if (!task) throw new Error('Task not found');
    return task;
}

// Delete a task
const deleteTask =  async (taskId) => {
    const task = await Task.findByIdAndDelete(mongoose.Types.ObjectId(taskId));
    if (!task) throw new Error('Task not found');
    return { success: true };
}

// List all tasks for a user
const listTasks =  async (userId) => {
    const tasks = await Task.find({ userId: mongoose.Types.ObjectId(userId)});
    return tasks;
}
module.exports = {
    getTask,
    updateTask,
    deleteTask,
    listTasks
};
