import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

io.use(socketAuthMiddleware); // apply authentication middleware to all socket connections

// check if user is online or not
export function getReceiverSocketId(userId)  {
    return userSocketMap.get(userId);
}

const userSocketMap = new Map(); // {userId: socketId} This is for storing online users

io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullName);
    const userId = socket.userId;
    userSocketMap.set(userId, socket.id);

    //io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });
});

export {io, app, server};
