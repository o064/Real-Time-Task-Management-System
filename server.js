const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const task_service_controller = require('./servicecontrollers/task_service_controller')
// const cookieParser = require('cookie-parser');


// middleware
app.use(express.json());
//app.use(cookieParser());


//config
require('dotenv').config();




// load task.protofile
const PROTO_PATH = __dirname + '/proto/task.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

// Start the gRPC server
const server = new grpc.Server();
server.addService(taskProto.TaskService.service, task_service_controller);
server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server running on port 5000');
});
