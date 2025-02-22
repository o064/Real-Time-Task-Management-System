const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const taskServiceImplementation = require('../service_controllers/task_service_controller');
const userServiceImplementation = require('../service_controllers/user_service_controller');


// load task.protofile
const Task_PROTO_PATH = __dirname + '/proto/task.proto';
const taskPackageDefinition = protoLoader.loadSync(Task_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const taskProto = grpc.loadPackageDefinition(taskPackageDefinition).task;


// load user.protofile
const User_PROTO_PATH = __dirname + '/proto/user.proto';
const userPackageDefinition = protoLoader.loadSync(User_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userPackageDefinition).user;


// Start the gRPC server
const startGrpcServer = ()=>{
    const server = new grpc.Server();
    server.addService(taskProto.TaskService.service, taskServiceImplementation);
    server.addService(userProto.UserService.service, userServiceImplementation);
    server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
        console.log('🚀 gRPC Server running on port 5000');
        server.start();
    });
    
}

module.exports=startGrpcServer;