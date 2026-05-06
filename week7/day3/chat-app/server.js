const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// In-memory store
// rooms[roomName] = { users: { socketId: username }, history: [{ username, message, time }] }
const rooms = {};

function getRoomUsers(room) {
  if (!rooms[room]) return [];
  return Object.values(rooms[room].users);
}

function getRoomHistory(room) {
  if (!rooms[room]) return [];
  return rooms[room].history;
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // User joins a room
  socket.on("joinRoom", ({ username, room }) => {
    // Leave any previous room
    const prevRoom = socket.currentRoom;
    if (prevRoom) {
      socket.leave(prevRoom);
      if (rooms[prevRoom]) {
        delete rooms[prevRoom].users[socket.id];
        io.to(prevRoom).emit("userList", getRoomUsers(prevRoom));
        io.to(prevRoom).emit("systemMessage", {
          message: `${socket.currentUsername} left the room.`,
          time: new Date().toLocaleTimeString(),
        });
      }
    }

    // Join new room
    socket.join(room);
    socket.currentRoom = room;
    socket.currentUsername = username;

    if (!rooms[room]) {
      rooms[room] = { users: {}, history: [] };
    }
    rooms[room].users[socket.id] = username;

    // Send chat history to the joining user
    socket.emit("chatHistory", getRoomHistory(room));

    // Notify the room
    io.to(room).emit("userList", getRoomUsers(room));
    socket.to(room).emit("systemMessage", {
      message: `${username} joined the room.`,
      time: new Date().toLocaleTimeString(),
    });

    console.log(`${username} joined room: ${room}`);
  });

  // Receive and broadcast a message
  socket.on("sendMessage", ({ message }) => {
    const room = socket.currentRoom;
    const username = socket.currentUsername;
    if (!room || !username) return;

    const payload = {
      username,
      message,
      time: new Date().toLocaleTimeString(),
    };

    // Save to history (keep last 100 messages per room)
    if (rooms[room]) {
      rooms[room].history.push(payload);
      if (rooms[room].history.length > 100) {
        rooms[room].history.shift();
      }
    }

    io.to(room).emit("newMessage", payload);
  });

  // Private message
  socket.on("privateMessage", ({ toUsername, message }) => {
    const from = socket.currentUsername;
    const time = new Date().toLocaleTimeString();

    // Find the target socket
    const allSockets = io.sockets.sockets;
    let targetSocket = null;
    allSockets.forEach((s) => {
      if (s.currentUsername === toUsername && s.currentRoom === socket.currentRoom) {
        targetSocket = s;
      }
    });

    if (targetSocket) {
      const payload = { from, message, time, private: true };
      targetSocket.emit("privateMessage", payload);
      socket.emit("privateMessage", { ...payload, to: toUsername });
    } else {
      socket.emit("systemMessage", {
        message: `User "${toUsername}" not found in this room.`,
        time: new Date().toLocaleTimeString(),
      });
    }
  });

  // Typing indicator
  socket.on("typing", () => {
    socket.to(socket.currentRoom).emit("typing", { username: socket.currentUsername });
  });

  socket.on("stopTyping", () => {
    socket.to(socket.currentRoom).emit("stopTyping");
  });

  // Disconnect
  socket.on("disconnect", () => {
    const room = socket.currentRoom;
    const username = socket.currentUsername;
    if (room && rooms[room]) {
      delete rooms[room].users[socket.id];
      io.to(room).emit("userList", getRoomUsers(room));
      io.to(room).emit("systemMessage", {
        message: `${username} left the chat.`,
        time: new Date().toLocaleTimeString(),
      });
    }
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Chat app running at http://localhost:${PORT}`);
});