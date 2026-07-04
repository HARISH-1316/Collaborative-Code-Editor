import React from "react";
import CodeEditor from "./components/CodeEditor";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { SocketContext } from "./SocketContext";
import { socket } from "./ws";
import { Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import File from "./components/File";
import Room from "./components/Room";

const App = () => {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/lobby" element={<Lobby />}></Route>

          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/editor" element={<Room />}></Route>

          <Route
            path="/editor/:roomId/:fileId"
            element={<CodeEditor />}
          ></Route>
        </Routes>
        <div>{/* <Lobby userName={userName} /> */}</div>
      </SocketContext.Provider>
    </>
  );
};

export default App;
