// chatgpt test for taskservice 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/proto/task.proto'; 
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

const client = new taskProto.TaskService('localhost:5000', grpc.credentials.createInsecure());

// 🟢 Test CreateTask
client.CreateTask({ title: 'New Task', description: 'This is a test task', userId: '65b123abc456def789' }, (err, response) => {
    if (err) {
        console.error('❌ CreateTask Error:', err);
    } else {
        console.log('✅ Task Created:', response);
    }
});

// 🟡 Test GetTask
client.GetTask({ taskId: '65b123abc456def001' }, (err, response) => {
    if (err) {
        console.error('❌ GetTask Error:', err);
    } else {
        console.log('✅ Task Fetched:', response);
    }
});

// 🔵 Test UpdateTask
client.UpdateTask({ taskId: '65b123abc456def001', title: 'Updated Task', description: 'Updated description', status: 'completed' }, (err, response) => {
    if (err) {
        console.error('❌ UpdateTask Error:', err);
    } else {
        console.log('✅ Task Updated:', response);
    }
});

// 🔴 Test DeleteTask
client.DeleteTask({ taskId: '65b123abc456def001' }, (err, response) => {
    if (err) {
        console.error('❌ DeleteTask Error:', err);
    } else {
        console.log('✅ Task Deleted:', response);
    }
});

// 🟠 Test ListTasks
client.ListTasks({ userId: '65b123abc456def789' }, (err, response) => {
    if (err) {
        console.error('❌ ListTasks Error:', err);
    } else {
        console.log('✅ List of Tasks:', response.tasks);
    }
});
