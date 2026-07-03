import { Box } from "@chakra-ui/react";
import { useState } from "react";
import CodeEditor from "./CodeEditor";
import File from "./File";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../SocketContext";

const Room = () => {
  const socket = useSocket();
  const [showFileForm, setShowFileForm] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const navigate = useNavigate();

  const handleCreate = async () => {
    setShowFileForm(false);

    const url = "http://localhost:3000/editor";
    try {
      const response = await axios.post(
        url,
        { roomName, fileName, language },
        { withCredentials: true },
      );
      if (response.data.success) {
        console.log(response.data.message);
        console.log(response.data.roomId);
        await joinRoom(response.data.roomId);
        navigate(`/editor/${response.data.roomId}`);
      } else {
        console.log("error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const joinRoom = (roomId) => {
    console.log("abcd");
    socket.emit("joinRoom", { roomId });
  };

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      {/* Background */}
      <CodeEditor />

      {/* Overlay */}
      {showFileForm && (
        <File
          setFileName={setFileName}
          setLanguage={setLanguage}
          setRoomName={setRoomName}
          handleCreate={handleCreate}
        />
      )}
    </Box>
  );
};

export default Room;
