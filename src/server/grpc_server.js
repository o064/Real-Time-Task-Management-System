const grpc = require('@grpc/grpc-js');
const taskServiceImplementation = require('../service_controllers/task_service_controller');
const userServiceImplementation = require('../service_controllers/user_service_controller');
const {loadProto} =require('../../utils/grpc');

const taskProto = loadProto(__dirname + '/../../proto/Task.proto').task;
const userProto = loadProto(__dirname + '/../../proto/User.proto').user;

// Start the gRPC server
const startGrpcServer = ()=>{
    const server = new grpc.Server();
    server.addService(taskProto.TaskService.service, taskServiceImplementation);
    server.addService(userProto.UserService.service, userServiceImplementation);
    server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC Server running on port 5000');
    });
    
}

module.exports= startGrpcServer;