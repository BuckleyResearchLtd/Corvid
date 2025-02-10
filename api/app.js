import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupConnection } from "./io/io.js";

const app = express();
const server = createServer(app);
const io = new Server(server, 
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  }
);


setupConnection(io);

server.listen(3000, () => { 
  console.log('listening on *:3000');
} );

