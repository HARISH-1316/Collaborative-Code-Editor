import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

const File = ({ setFileName, setLanguage, setRoomName, handleCreate }) => {
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
          <FormControl>
            <FormLabel>Room Name</FormLabel>
            <Input
              placeholder="e.g. My Project"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>File Name</FormLabel>
            <Input
              placeholder="e.g. index.js"
              onChange={(e) => setFileName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select onChange={(e) => setLanguage(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </Select>
          </FormControl>

          <Button colorScheme="blue" w="100%" onClick={handleCreate}>
            Create File
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default File;
