const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load Protobuf definitions
const loadProto = (path) => {
    return grpc.loadPackageDefinition(protoLoader.loadSync(path, {
        keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
    }));
};
module.exports={
    loadProto
}