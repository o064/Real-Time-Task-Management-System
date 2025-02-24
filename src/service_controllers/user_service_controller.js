const grpc = require('@grpc/grpc-js');
const UserService = require('../services/user_service');
const User = require('../database/models/User')
const { authUser, authAdmin ,middleWareHelper } = require("../middleware/authorize");


// Implement the UserService
const userServiceImplementation = {
    LoginUser: async (call, callback) => {
        const { email, password } = call.request;
        try {
            const user = await User.logIn(email, password); //static method in User model
            // Generate JWT
            const token = user.generateToken();
            // Create Metadata
            const metadata = new grpc.Metadata();
            metadata.add('authorization', `Bearer ${token}`);
            call.sendMetadata(metadata);
            callback(null, {
                user: {
                    userId: user._id.toString(),
                    email: user.email,
                    userName: user.userName,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                }
            });
        } catch (err) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                message: err.message,
            });
        }
    },
    CreateUser: async (call, callback) => {
        const { email, userName, password } = call.request;
        try {
            const user = await UserService.createUser(email, userName, password);
            callback(null, {
                user: {
                    userId: user._id.toString(),
                    email: user.email,
                    userName: user.userName,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                }
            });
        } catch (err) {
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            });
        }
    },
    GetUser: middleWareHelper(authUser,
        async (call, callback) => {
            const { userId } = call.request;
            try {
                const user = await UserService.getUser(userId);
                callback(null, {
                    user: {
                        userId: user._id.toString(),
                        email: user.email,
                        userName: user.userName,
                        password: user.password,
                        isAdmin: user.isAdmin,
                        createdAt: user.createdAt.toISOString(),
                        updatedAt: user.updatedAt.toISOString(),
                    }
                });
            } catch (err) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: err.message,
                });
            }
        }
    )
    ,
    UpdateUser: middleWareHelper(authUser,
        async (call, callback) => {
            const { userId, userName } = call.request;
            try {
                if(userId  != call.user.userId){
                    throw Error('You cannot update that user');
                }
                const user = await UserService.updateUser(userId, userName);
                callback(null, {
                    user: {
                        userId: user._id.toString(),
                        email: user.email,
                        userName: user.userName,
                        password: user.password,
                        isAdmin: user.isAdmin,
                        createdAt: user.createdAt.toISOString(),
                        updatedAt: user.updatedAt.toISOString(),
                    }
                });
            } catch (err) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: err.message,
                });
            }
        }
    )
    ,
    DeleteUser: middleWareHelper(authAdmin,
        async (call, callback) => {
            const { userId } = call.request;
            try {
                const result = await UserService.deleteUser(userId);
                callback(null, { success: result.success });
            } catch (err) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: err.message,
                });
            }
        }
    )

};
module.exports = userServiceImplementation

