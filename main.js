const express = require('express');
const app = express();
const connectDB = require('./src/database/connection/db');
const startGrpcServer =require('./src/server/grpc_server');

//config
require('dotenv').config();

// Connect to database
connectDB();  


//start grpc server
startGrpcServer();