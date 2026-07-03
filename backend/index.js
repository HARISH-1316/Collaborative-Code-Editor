import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

// CORS
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Mongoose
import mongoose from "mongoose";
const DB_URL = "mongodb://127.0.0.1:27017/cce";
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
import session from "express-session";

const sessionOptions = {
  secret: "mySecretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));

// Passport
import User from "./Models/User.js";
import passport from "passport";
import LocalStrategy from "passport-local";

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routers
import userRouter from "./Routes/User.js";
import roomRouter from "./Routes/Room.js";

// Routes
app.use("/", userRouter);
app.use("/", roomRouter);

//Models
import Room from "./Models/Room.js";

const port = process.env.PORT || 3000;

io.on("connection", async (socket) => {
  console.log(`A user connected with ${socket.id}`);

  socket.on("joinRoom", async ({ roomId }, callback) => {
    const room = await Room.findOne({ roomId });
    if (!room) {
      return callback({
        failure: true,
        message: "roomId is invalid",
      });
    }

    socket.join(roomId);
    socket.roomId = roomId;
    return callback({
      success: true,
      message: `Joined room ${roomId}`,
    });
  });

  socket.on("leaveRoom", (callback) => {
    socket.leave(socket.roomId);
    socket.emit("leaveRoom");
    return callback({
      success: true,
      message: `Left room ${socket.roomId}`,
    });
  });

  socket.on("codeChange", ({ roomId, code }) => {
    socket.to(roomId).emit("codeChange", code);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
