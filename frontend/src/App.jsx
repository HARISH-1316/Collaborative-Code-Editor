import React from "react";
import CodeEditor from "./components/CodeEditor";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { SocketContext } from "./SocketContext";
import { socket } from "./ws";
import { Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import File from "./components/File";
import Room from "./components/Room";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard";
import JoinRoom from "./components/JoinRoom";
import MyRooms from "./components/MyRooms";

const App = () => {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/lobby"
            element={
              <ProtectedRoute>
                <Lobby />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/auth/signup" element={<SignUp />}></Route>

          <Route path="/auth/login" element={<Login />}></Route>

          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/join"
            element={
              <ProtectedRoute>
                <JoinRoom />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/editor/:roomId/file/:fileName"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </SocketContext.Provider>
    </>
  );
};

export default App;
