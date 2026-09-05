import React, { use, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, useToast } from "@chakra-ui/react";
import Split from "react-split";
import Output from "./Output";
import { useSocket } from "../SocketContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import api from "../api";
import FileInfo from "./FileInfo";
import Input from "./Input";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const typingRef = useRef(null);
  const isEdited = useRef(false);
  const { roomId, fileName } = useParams();
  const socket = useSocket();
  const toast = useToast();

  const [code, setCode] = useState("// Write your code here...");
  const [username, setUsername] = useState("");
  const [roomOwner, setRoomOwner] = useState("");
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef("");
  const [output, setOutput] = useState("Hello Output");
  const [hasError, setHasError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const cursorDecorations = useRef({});
  const remoteCursors = useRef({});

  useEffect(() => {
    socket.emit("joinRoom", { roomId, username }, (response) => {
      if (!socket) return;

      if (response.success) {
        console.log(response.message);
      } else {
        console.log("Could not able to join room");
      }
    });
    socket.on("onlineUsers", ({ nowOnline }) => {
      setOnlineUsers(nowOnline);
    });
  }, [socket]);

  useEffect(() => {
    const getRoom = async () => {
      const url = `/editor/${roomId}/file/${fileName}`;

      try {
        const response = await api.get(url, {
          withCredentials: true,
        });

        if (response.data.success) {
          const { room, user } = response.data;

          console.log(room);
          console.log(user);

          setUsername(user.username);
          setRoomName(room.roomName);
          setRoomOwner(room.roomOwner);
          setCode(room.content);
          setLanguage(room.language);

          const currentUsername = user.username;
          getOnlineUsers(currentUsername);
        }
      } catch (err) {
        toast({
          title: "Unable to Open Room",
          description:
            err.response?.data?.message ||
            "An error occurred while loading the room.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    if (roomId) {
      getRoom();
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("codeChange", (data) => {
      const editor = editorRef.current;

      if (!editor) return;

      isEdited.current = true;

      editor.setValue(data.code);

      isEdited.current = false;

      // Update the person who made the change
      updateRemoteCursor(data);
    });

    socket.on("userJoined", ({ newUser }) => {
      userJoinedToast(newUser);
    });

    socket.on("userLeft", ({ user }) => {
      userLeftToast(user);
    });

    const handleCursorMove = (data) => {
      console.log("Remote cursor:", data);

      // Store the latest information
      remoteCursors.current[data.userId] = {
        username: data.username,
        line: data.line,
        column: data.column,
      };

      console.log(data);

      // Update that user's decoration
      updateRemoteCursor(data);
    };

    socket.on("cursor-move", handleCursorMove);

    return () => {
      socket.off("codeChange");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("cursor-move");
    };
  }, [socket]);

  const getOnlineUsers = async (currentUsername) => {
    console.log(currentUsername, "(*)");
    socket.emit("onlineUsers", { currentUsername });
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.focus();

    // ==========================
    // CODE CHANGE
    // ==========================
    editor.onDidChangeModelContent(() => {
      if (isEdited.current) return;

      clearTimeout(typingRef.current);

      typingRef.current = setTimeout(() => {
        const position = editor.getPosition();

        socket.emit("codeChange", {
          roomId,
          code: editor.getValue(),

          cursor: position
            ? {
                line: position.lineNumber,
                column: position.column,
              }
            : null,
        });
      }, 0);
    });

    // ==========================
    // LOCAL CURSOR
    // ==========================
    editor.onDidChangeCursorPosition((event) => {
      console.log(event.position, "****");
      const { lineNumber, column } = event.position;
      console.log(lineNumber);

      socket.emit("cursor-move", {
        roomId,
        line: lineNumber,
        column,
      });
    });

    // ==========================
    // SAVE
    // ==========================
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () =>
      handleSave(),
    );

    // ==========================
    // RUN
    // ==========================
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
      runCode(),
    );
  };

  const updateRemoteCursor = (data) => {
    console.log(data, "*");

    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco) return;

    // Always use userId as the key
    const oldDecoration = cursorDecorations.current[data.userId] || null;

    const decoration = {
      range: new monaco.Range(data.line, data.column, data.line, data.column),

      options: {
        beforeContentClassName: `remote-cursor cursor-${data.userId}`,

        hoverMessage: {
          value: `👤 **${data.username}**`,
        },
      },
    };

    const newDecorationIds = editor.deltaDecorations(
      oldDecoration ? [oldDecoration] : [],
      [decoration],
    );

    // Store using the SAME key
    cursorDecorations.current[data.userId] = newDecorationIds[0];
  };

  const handleSave = async () => {
    console.log("ab");
    const url = `/editor/${roomId}/file/${fileName}`;
    try {
      const response = await api.post(
        url,
        { code: editorRef.current.getValue() },
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        codeSavedToast();
        console.log(response.data.message);
      } else {
        console.log("error occures while saving code");
      }
    } catch (err) {
      const message = err.response?.data?.message;
      toast({
        title: "Save Failed",
        description:
          message ||
          "An error occurred while saving your code. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const codeSavedToast = () => {
    toast({
      title: "Code saved",
      description: "Your changes have been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const userJoinedToast = (newUser) => {
    console.log(newUser);
    toast({
      title: "User Joined",
      description: `${newUser} joined the room.`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const userLeftToast = (username) => {
    toast({
      title: "User Left",
      description: `${username} left the room.`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const runCode = async () => {
    const url = `/editor/${roomId}/execute`;

    try {
      console.log("runCode");
      console.log(inputRef.current, "()");

      setIsRunning(true);
      const response = await api.post(
        url,
        { input: inputRef.current },
        { withCredentials: true },
      );

      const { stdout, stderr } = response.data;

      if (response.data.success) {
        if (stderr && stderr !== "") {
          setHasError(true);
          setOutput(stderr);
        } else {
          setHasError(false);
          setOutput(stdout);
        }
      }
    } catch (err) {
      toast({
        title: "Execution Failed",
        description:
          err.response?.data?.message ||
          "An error occurred while running your code. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Box bg="gray.950" minH="100vh">
      <Navbar
        roomName={roomName}
        roomId={roomId}
        owner={roomOwner}
        users={onlineUsers}
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
            <Split
              direction="vertical"
              sizes={[35, 65]}
              minSize={[100, 150]}
              gutterSize={8}
              gutter={(index, direction) => {
                const gutter = document.createElement("div");
                gutter.className = `gutter gutter-${direction}`;
                return gutter;
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Input input={input} setInput={setInput} inputRef={inputRef} />

              <Output
                output={output}
                runCode={runCode}
                hasError={hasError}
                isRunning={isRunning}
              />
            </Split>
          </Box>
        </Split>
      </Box>
    </Box>
  );
};

export default CodeEditor;
