const connectDB = require('./src/database/connection/db');
const startGrpcServer =require('./src/server/grpc_server')
// const cookieParser = require('cookie-parser');

//config

require('dotenv').config();

// Connect to database

connectDB();  


// middleware


//start grpc server

startGrpcServer();



