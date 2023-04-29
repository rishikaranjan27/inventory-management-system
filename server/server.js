import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import inventoryRouter from './Routes/InventoryRoute.js';
import http from "http"
import {Server} from "socket.io"




//Get .env file
dotenv.config();



//App Config
const app = express();




//Connect to database 

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });




//Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));




//Connect Socket.io

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',                //client address
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})



export {io}    //Exporting { io } to use in ProductRoute.js file




//Establishing connection between two servers

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})






//API Endpoints

app.use('/api/inventory', inventoryRouter);




//Socket.io Listener

const port = process.env.PORT || 5000;


server.listen(port, () => {
    console.log("Server is running");
})







