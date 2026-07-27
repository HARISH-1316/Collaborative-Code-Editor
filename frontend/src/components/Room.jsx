import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import File from "./File";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../SocketContext";

const Room = ({ mode }) => {
  const { roomId, fileName: urlFileName } = useParams();

  const toast = useToast();
  const socket = useSocket();
  const navigate = useNavigate();

  const [showFileForm, setShowFileForm] = useState(true);

  const [roomName, setRoomName] = useState("");
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (mode !== "edit") return;

    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/editor/${roomId}/file/${urlFileName}`,
          {
            withCredentials: true,
          },
        );

        console.log(response.data);

        if (response.data.success) {
          if (response.data.success) {
            const room = response.data.Room;

            setRoomName(room.roomName);
            setFileName(room.fileName);
            setLanguage(room.language);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRoom();
  }, [mode, roomId, urlFileName]);

  const handleCreate = async () => {
    const url =
      mode === "create"
        ? "http://localhost:3000/editor"
        : `http://localhost:3000/editor/${roomId}/file/${urlFileName}/edit`;

    try {
      const response =
        mode === "create"
          ? await axios.post(
              url,
              {
                roomName,
                fileName,
                language,
              },
              {
                withCredentials: true,
              },
            )
          : await axios.patch(
              url,
              {
                roomName,
                fileName,
                language,
              },
              {
                withCredentials: true,
              },
            );

      if (response.data.success) {
        setShowFileForm(false);

        if (mode === "create") {
          roomCreatedToast();

          navigate(
            `/editor/${response.data.roomId}/file/${response.data.fileName}`,
          );
        } else {
          roomEditedToast();

          navigate(`/editor/${roomId}/file/${response.data.fileName}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const roomCreatedToast = () => {
    toast({
      title: "Room Created",
      description: "Your collaboration room has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const roomEditedToast = () => {
    toast({
      title: "Room Updated",
      description: "Your collaboration room has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <CodeEditor />

      {showFileForm && (
        <File
          mode={mode}
          roomName={roomName}
          fileName={fileName}
          language={language}
          setRoomName={setRoomName}
          setFileName={setFileName}
          setLanguage={setLanguage}
          handleCreate={handleCreate}
        />
      )}
    </Box>
  );
};

export default Room;
