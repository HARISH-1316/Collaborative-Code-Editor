import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import File from "./File";
import api from "../api";
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

  // NEW
  const [errors, setErrors] = useState({
    roomName: "",
    fileName: "",
    language: "",
  });

  useEffect(() => {
    if (mode !== "edit") return;

    const fetchRoom = async () => {
      try {
        const response = await api.get(
          `/editor/${roomId}/file/${urlFileName}`,
          {
            withCredentials: true,
          },
        );

        console.log(response.data);

        if (response.data.success) {
          const room = response.data.room;

          setRoomName(room.roomName);
          setFileName(room.fileName);
          setLanguage(room.language);
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
        ? "/editor"
        : `/editor/${roomId}/file/${urlFileName}/edit`;

    // NEW
    setErrors({
      roomName: "",
      fileName: "",
      language: "",
    });

    try {
      console.log(url);
      console.log(mode);
      console.log(roomName, fileName, language);

      const response =
        mode === "create"
          ? await api.post(
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
          : await api.patch(
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

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        toast({
          title: "Error",
          description:
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
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
          errors={errors} // NEW
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
