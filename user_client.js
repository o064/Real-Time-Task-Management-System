// chatgpt test for userservice 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/proto/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:5000', grpc.credentials.createInsecure());
let id ;
// 🟢 Test CreateUser
client.CreateUser({ 
    email: "validemail3@example.com", 
    userName: "User125", 
    password: "StrongPass@1" 
}, (err, response) => {
    if (err) console.error('❌ Error:', err.message);
    else {
        id =response.userId;
        console.log('✅ User Created:', response ,id);
    }
});


// // 🟡 Test GetUser
// client.GetUser({ userId: id }, (err, response) => {
//     if (err) {
//         console.error('❌ GetUser Error:', err);
//     } else {
//         console.log('✅ User Fetched:', response);
//     }
// });

// // 🔵 Test UpdateUser
// client.UpdateUser({ userId: id, userName: 'updatedUser' }, (err, response) => {
//     if (err) {
//         console.error('❌ UpdateUser Error:', err);
//     } else {
//         console.log('✅ User Updated:', response);
//     }
// });

// // 🔴 Test DeleteUser
// client.DeleteUser({ userId: id}, (err, response) => {
//     if (err) {
//         console.error('❌ DeleteUser Error:', err);
//     } else {
//         console.log('✅ User Deleted:', response);
//     }
// });
