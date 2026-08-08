import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

const File = ({
  mode,
  roomName,
  fileName,
  language,
  errors,
  setRoomName,
  setFileName,
  setLanguage,
  handleCreate,
}) => {
  return (
    <Box
      position="absolute"
      inset="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="blackAlpha.700"
      zIndex={100}
    >
      <Box bg="gray.800" color="white" p={6} rounded="lg" w="400px" shadow="xl">
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.roomName}>
            <FormLabel>Room Name</FormLabel>
            <Input
              placeholder="e.g. My Project"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <FormErrorMessage>{errors.roomName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.fileName}>
            <FormLabel>File Name</FormLabel>
            <Input
              placeholder="e.g. index.js"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <FormErrorMessage>{errors.fileName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.language}>
            <FormLabel>Language</FormLabel>

            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </Select>

            <FormErrorMessage>{errors.language}</FormErrorMessage>
          </FormControl>

          <Button colorScheme="blue" w="100%" onClick={handleCreate}>
            {mode === "create" ? "Create File" : "Save Changes"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default File;
