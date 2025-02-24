// chatgpt test for taskservice 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../proto/Task.proto'; 
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

const client = new taskProto.TaskService('localhost:5000', grpc.credentials.createInsecure());


// Function to create a task (requires user auth)
const createTask = (title, description, token) => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.CreateTask({ title, description }, metadata, (error, response) => {
        if (error) {
            console.error('Create Task Error:', error.message);
        } else {
            console.log('Task Created:', response.task);
        }
    });
};

// Function to get task details (requires user auth)
const getTask = (taskId, token) => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.GetTask({ taskId }, metadata, (error, response) => {
        if (error) {
            console.error('Get Task Error:', error.message);
        } else {
            console.log('Task Details:', response.task);
        }
    });
};

// Function to update a task (requires user auth)
const updateTask = (taskId, title, description, status, token) => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.UpdateTask({ taskId, title, description, status }, metadata, (error, response) => {
        if (error) {
            console.error('Update Task Error:', error.message);
        } else {
            console.log('Task Updated:', response.task);
        }
    });
};

// Function to delete a task (requires user auth)
const deleteTask = (taskId, token) => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.DeleteTask({ taskId }, metadata, (error, response) => {
        if (error) {
            console.error('Delete Task Error:', error.message);
        } else {
            console.log('Task Deleted:', response.success);
        }
    });
};

// Function to list tasks for a user (requires user auth)
const listTasks = (userId, token) => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${token}`);
    client.ListTasks({ userId }, metadata, (error, response) => {
        if (error) {
            console.error('List Tasks Error:', error.message);
        } else {
            console.log('Tasks:', response.tasks);
        }
    });
};

// Example usage (uncomment to test):
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JiOWM0Y2QwMmY5YWUzNTg2OTI3MGQiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDM0ODc1OCwiZXhwIjoxNzQwNjA3OTU4fQ.XRQo3sSunvmsuf7v70WNJgfmKMH2ccNpYHY_u1I_NkA'; 
//createTask('New Task1', 'This is a test task', token);
//getTask('67bc337cf78b0f133adfc345', token);
//updateTask('67bc337cf78b0f133adfc345', 'Updated Title', 'Updated Description', 'completed', token);
//deleteTask('67bc337cf78b0f133adfc345', token);
//listTasks('67bb9c4cd02f9ae35869270d', token);

