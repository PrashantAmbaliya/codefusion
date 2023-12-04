const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const app = express();
const port = process.env.PORT || 8000
const server = createServer(app);
const io = new Server(server);

const usersSocketMap = {};

function getAllConnectedClients(roomID){
    return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map(
        (socketID) => {
            return {
                socketID,
                username : usersSocketMap[socketID]
            }
        } 
    )
}


io.on('connection', (socket) => {


    socket.on(ACTIONS.JOIN, ({roomID,username}) => {
        usersSocketMap[socket.id] = username;
        socket.join(roomID);
        const clients = getAllConnectedClients(roomID);
        clients.forEach(({socketID}) => {
            io.to(socketID).emit(ACTIONS.JOINED,{
                clients,
                username,
                socketID : socket.id
            })
        })
    })

    socket.on(ACTIONS.CODE_CHANGE, ({roomID, value}) => {
        io.to(roomID).emit(ACTIONS.CODE_CHANGE, {
            roomID,
            value,
        })
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomID) => {
            socket.in(roomID).emit(ACTIONS.DISCONNECTED, {
                socketID: socket.id,
                username: usersSocketMap[socket.id]
            })
        })
        delete usersSocketMap[socket.id];
        socket.leave();
    })

})

server.listen(port,() => {
    console.log('Server is Running on:'+ port);
})