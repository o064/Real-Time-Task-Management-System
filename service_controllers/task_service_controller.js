const grpc = require('@grpc/grpc-js');
const taskService = require('../services/task_service');
// Implement the TaskService
const taskServiceController = {
    CreateTask: async (call, callback) => {
        const { title, description, userId } = call.request;
        try {
            const task = await taskService.createTask(title, description, userId);
            callback(null, { 
                task: { 
                    taskId: task.taskId.toString(),
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    userId: task.userId.toString(),
                    createdAt: task.createdAt.toISOString(),
                    updatedAt: task.updatedAt.toISOString(),
                } 
            });
        } catch (err) {
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            });
        }
    },
    GetTask: async (call, callback) => {
        const { taskId } = call.request;
        try {
            const task = await taskService.getTask(taskId);
            callback(null, { 
                task: { 
                    taskId: task.taskId.toString(),
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    userId: task.userId.toString(),
                    createdAt: task.createdAt.toISOString(),
                    updatedAt: task.updatedAt.toISOString(),
                }  
            });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    },
    UpdateTask: async (call, callback) => {
        const { taskId,title,description,status } = call.request;
        try {
            const task = await taskService.updateTask(taskId,title,description,status);
            callback(null, { 
                task: { 
                    taskId: task.taskId.toString(),
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    userId: task.userId.toString(),
                    createdAt: task.createdAt.toISOString(),
                    updatedAt: task.updatedAt.toISOString(),
                } 
            });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    },
    DeleteTask: async (call, callback) => {
        const { taskId } = call.request;
        try {
            const result  = await taskService.deleteTask(taskId);
            callback(null, { success: result.success });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    },
    ListTasks: async (call, callback) => {
        const { userId} = call.request;
        try {
            const tasks = await taskService.ListTasks(userId);
            callback(null, { 
                tasks: tasks.map(task => ({
                    taskId: task.taskId.toString(),
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    userId: task.userId.toString(),
                    createdAt: task.createdAt.toISOString(),
                    updatedAt: task.updatedAt.toISOString(),
                }))
            });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    }
};
module.exports = taskServiceImplementation