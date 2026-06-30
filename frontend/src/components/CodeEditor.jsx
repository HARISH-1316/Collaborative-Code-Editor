import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
import Split from "react-split";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { useSocket } from "../SocketContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const typingRef = useRef(null);
  const isEdited = useRef(false);
  const { roomId } = useParams();
  const socket = useSocket();

  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [roomOwner, setRoomOwner] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.emit("roomState", roomId);

    socket.on("roomState", (Room) => {
      setRoomName(Room.roomName);
      setRoomOwner(Room.roomOwner);
    });

    socket.on("codeChange", (code) => {
      console.log(code);
      isEdited.current = true;
      editorRef.current.setValue(code);
      setCode(code);
      isEdited.current = false;
    });
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editorRef.current.onDidChangeModelContent(() => {
      if (isEdited.current) return;

      clearTimeout(typingRef.current);
      typingRef.current = setTimeout(() => {
        socket.emit("codeChange", { roomId, code: editor.getValue() });
      }, 100);
    });
  };

  const onSelect = (lang) => {
    setLanguage(lang);
  };

  return (
    <Box bg="gray.950" minH="100vh">
      <Navbar
        roomName={roomName}
        roomId={roomId}
        owner={roomOwner}
        users={[
          { id: 1, name: "Harish" },
          { id: 2, name: "Rahul" },
        ]}
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
            <LanguageSelector language={language} onSelect={setLanguage} />

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
