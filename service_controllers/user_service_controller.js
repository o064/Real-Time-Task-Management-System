const grpc = require('@grpc/grpc-js');
const UserService = require('../services/user_service');
// Implement the UserService
const userServiceImplementation = {
    CreateUser: async (call, callback) => {
        const {email,userName,password} = call.request;
        try {
            const User = await UserService.createUser(email, userName, password);
            callback(null, { 
                user: { 
                    userId: User.userId.toString(),
                    email: User.email,
                    userName: User.userName,
                    password: User.password,
                    createdAt: User.createdAt.toISOString(),
                    updatedAt: User.updatedAt.toISOString(),
                } 
            });
        } catch (err) {
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            });
        }
    },
    GetUser: async (call, callback) => {
        const { userId } = call.request;
        try {
            const User = await UserService.getUser(userId);
            callback(null, { 
                user: { 
                    userId: User.userId.toString(),
                    email: User.email,
                    userName: User.userName,
                    password: User.password,
                    createdAt: User.createdAt.toISOString(),
                    updatedAt: User.updatedAt.toISOString(),
                }  
            });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    },
    UpdateUser: async (call, callback) => {
        const { userId,userName } = call.request;
        try {
            const User = await UserService.updateUser(userId,userName);
            callback(null, { 
                user: { 
                    userId: User.userId.toString(),
                    email: User.email,
                    userName: User.userName,
                    password: User.password,
                    createdAt: User.createdAt.toISOString(),
                    updatedAt: User.updatedAt.toISOString(),
                } 
            });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    },
    DeleteUser: async (call, callback) => {
        const { userId } = call.request;
        try {
            const result  = await UserService.deleteUser(userId);
            callback(null, { success: result.success });
        } catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message,
            });
        }
    }
};
module.exports = userServiceImplementation