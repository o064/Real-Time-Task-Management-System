// test for userservice 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/proto/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:5000', grpc.credentials.createInsecure());
let id ;
// Function to get user details (requires admin auth)
const getUser = (userId, token) => {
    const metadata = new grpc.Metadata();
    metadata.add("authorization", `Bearer ${token}`);
    client.GetUser({ userId }, metadata, (error, response) => {
        if (error) {
            console.error(" Get User Error:", error.message);
        } else {
            console.log(" User Details:", response);
        }
    });
};

// Function to login a user
const loginUser = (email, password) => {
    client.LoginUser({ email, password }, (error, response) => {
        if (error) {
            console.error('Login Error:', error.message);
        } else {
            console.log('Login Successful:', response);
        }
    }).on('metadata', (metadata) => {
        const token = metadata.get('authorization')[0]; // Extract token
        console.log('Received Token:', token);
    });
};

// Function to create a user
const createUser = (email, userName, password) => {
    client.CreateUser({ email, userName, password }, (error, response) => {
        if (error) {
            console.error('Create User Error:', error.message);
        } else {
            console.log('User Created:', response);
        }
    });
};


// Function to update a user (requires user auth)
const updateUser = (userId, userName, token) => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.UpdateUser({ userId, userName }, metadata, (error, response) => {
        if (error) {
            console.error('Update User Error:', error.message);
        } else {
            console.log('User Updated:', response);
        }
    });
};

// Function to delete a user (requires admin auth)
const deleteUser = (userId, token) => {
    console.log(userId);
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.DeleteUser({ userId }, metadata, (error, response) => {
        if (error) {
            console.error('Delete User Error:', error.message);
        } else {
            console.log('User Deleted:', response);
        }
    });
};

// Example usage:
//loginUser('admin1@example.com', '@Password456');
//createUser('admin01@example.com', 'Admin01', '@Password456');
//getUser('67bb9a50c36ca36c8fd38fd0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JiOWM0Y2QwMmY5YWUzNTg2OTI3MGQiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDM0ODc1OCwiZXhwIjoxNzQwNjA3OTU4fQ.XRQo3sSunvmsuf7v70WNJgfmKMH2ccNpYHY_u1I_NkA');
//updateUser('67bb87fb8f03a01e5a526da7', 'omarMohamed', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JiODdmYjhmMDNhMDFlNWE1MjZkYTciLCJlbWFpbCI6Im5ld3VzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDAzNDY2ODQsImV4cCI6MTc0MDYwNTg4NH0.mMy2uo4iTS_1xLo-qtwlI90d_BC2EEUrK21UD-VTJSI');
//deleteUser('67bb87fb8f03a01e5a526da7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JiOWM0Y2QwMmY5YWUzNTg2OTI3MGQiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDM0ODc1OCwiZXhwIjoxNzQwNjA3OTU4fQ.XRQo3sSunvmsuf7v70WNJgfmKMH2ccNpYHY_u1I_NkA');
