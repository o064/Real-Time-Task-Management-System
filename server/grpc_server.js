const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const taskServiceImplementation = require('../service_controllers/task_service_controller');
const userServiceImplementation = require('../service_controllers/user_service_controller');


// Load Protobuf definitions
const loadProto = (path) => {
    return grpc.loadPackageDefinition(protoLoader.loadSync(path, {
        keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
    }));
};

const taskProto = loadProto(__dirname + '/../proto/task.proto').task;
const userProto = loadProto(__dirname + '/../proto/user.proto').user;

// Start the gRPC server
const startGrpcServer = ()=>{
    const server = new grpc.Server();
    server.addService(taskProto.TaskService.service, taskServiceImplementation);
    server.addService(userProto.UserService.service, userServiceImplementation);
    server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC Server running on port 5000');
    });
    
}

module.exports=startGrpcServer;