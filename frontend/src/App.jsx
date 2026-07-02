import React from "react";
import CodeEditor from "./components/CodeEditor";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { SocketContext } from "./SocketContext";
import { socket } from "./ws";
import { Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";

const App = () => {
  const [userName, setUserName] = useState("");
  return (
    <>
      <SocketContext.Provider value={socket}>
        <input
          placeholder="Enter you username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>

        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}

          <Route path="/lobby" element={<Lobby userName={userName} />}></Route>

          <Route path="/editor/:roomId" element={<CodeEditor />}></Route>
        </Routes>
        <div>{/* <Lobby userName={userName} /> */}</div>
      </SocketContext.Provider>
    </>
  );
};

export default App;
