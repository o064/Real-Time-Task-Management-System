const connectDB = require('./database/connection/db');
const startGrpcServer =require('./server/grpc_server')
// const cookieParser = require('cookie-parser');

//config

require('dotenv').config();

// Connect to database

connectDB();  

// middleware

//start grpc server

startGrpcServer();



