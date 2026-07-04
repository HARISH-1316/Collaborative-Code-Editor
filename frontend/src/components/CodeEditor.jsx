import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
import Split from "react-split";
import Output from "./Output";
import { useSocket } from "../SocketContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import FileInfo from "./FileInfo";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const typingRef = useRef(null);
  const isEdited = useRef(false);
  const { roomId, fileId } = useParams();
  const socket = useSocket();

  const [code, setCode] = useState("// Write your code here...");
  const [roomOwner, setRoomOwner] = useState("");
  const [roomName, setRoomName] = useState("");
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { roomId }, (response) => {
      if (!socket) return;

      if (response.success) {
        console.log(response.message);
      } else {
        console.log("Could not able to join room");
      }
    });
  }, [socket]);

  useEffect(() => {
    const getRoom = async () => {
      const url = `http://localhost:3000/editor/${roomId}/${fileId}`;

      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });

        if (response.data.success) {
          const { Room } = response.data;

          console.log(Room);

          setRoomName(Room.roomName);
          setRoomOwner(Room.roomOwner);
          setFileName(Room.fileName);
          setCode(Room.content);
          setLanguage(Room.language);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (roomId) {
      getRoom();
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("codeChange", (code) => {
      isEdited.current = true;
      setCode(code);
      isEdited.current = false;
    });

    return () => {
      socket.off("codeChange");
    };
  }, [socket]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editorRef.current.onDidChangeModelContent(() => {
      if (isEdited.current) return;

      clearTimeout(typingRef.current);
      typingRef.current = setTimeout(() => {
        socket.emit("codeChange", {
          roomId,
          code: editorRef.current.getValue(),
        });
      }, 100);
    });
  };

  const handleSave = async () => {
    console.log("ab");
    const url = `http://localhost:3000/editor/${roomId}/${fileId}`;
    try {
      const response = await axios.post(
        url,
        { code: editorRef.current.getValue() },
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.log("error occures while saving code");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box bg="gray.950" minH="100vh">
      <Navbar
        roomName={roomName}
        roomId={roomId}
        owner={roomOwner}
        users={[]}
      />

      <Box
        p={5}
        h="calc(100vh - 80px)" // 80px = navbar height
      >
        <Split
          sizes={[72, 28]}
          minSize={300}
          gutterSize={12}
          direction="horizontal"
          gutter={(index, direction) => {
            const gutter = document.createElement("div");
            gutter.className = `gutter gutter-${direction}`;
            return gutter;
          }}
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          {/* Editor */}
          <Box
            bg="gray.900"
            borderRadius="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.700"
            boxShadow="xl"
          >
            <FileInfo
              fileName={fileName}
              language={language}
              handleSave={handleSave}
            />

            <Editor
              height="calc(100% - 60px)"
              theme="vs-dark"
              language={language}
              value={code}
              onMount={onMount}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
                fontSize: 15,
                smoothScrolling: true,
                scrollBeyondLastLine: false,
                padding: {
                  top: 12,
                },
              }}
            />
          </Box>

          {/* Output */}
          <Box
            borderRadius="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.700"
            boxShadow="xl"
            bg="gray.900"
          >
            <Output editorRef={editorRef} language={language} />
          </Box>
        </Split>
      </Box>
    </Box>
  );
};

export default CodeEditor;
