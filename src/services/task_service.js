const Task = require('../database/models/Task');
// create task
const createTask = async (title, description, userId) => {
    console.log(userId);
    return  await Task.create({ title, description, userId });
};
// Get a task by ID
const getTask =  async (taskId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error('Task not found');
    console.log(task)
    return task;
}
// Update a task
const updateTask = async (taskId, title, description, status) => {
    const task = await Task.findByIdAndUpdate(taskId,
        { title, description, status, updatedAt: Date.now() },
        { new: true }
    );
    if (!task) throw new Error('Task not found');
    return task;
}

// Delete a task
const deleteTask =  async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) throw new Error('Task not found');
    return { success: true };
}

// List all tasks for a user
const listTasks =  async (userId) => {
    const tasks = await Task.find({ userId: userId});
    return tasks;
}
module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    listTasks
};
