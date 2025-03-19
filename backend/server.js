const express = require("express");
const socket = require("socket.io");
const http = require("http");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: { origin: process.env.CLIENT_URL },
});

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/posts", postRoutes);

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
