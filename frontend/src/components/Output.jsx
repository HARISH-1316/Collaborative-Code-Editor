import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { editor } from "monaco-editor";
import { executeCode } from "./api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Output = ({ editorRef, language }) => {
  const { roomId } = useParams();
  const [output, setOutput] = useState("Hello Output");
  const [hasError, setHasError] = useState(false);

  const runCode = async () => {
    const url = `http://localhost:3000/editor/${roomId}/execute`;
    try {
      console.log("runCode");
      const response = await axios.post(url, {}, { withCredentials: true });
      const { stdout, stderr } = response.data;

      if (response.data.success) {
        if (stderr && stderr.trim() !== "") {
          setHasError(true);
          setOutput(stderr);
        } else {
          setHasError(false);
          setOutput(stdout);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      w="100%"
      h="75%"
      bg="gray.800"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.700"
      p={4}
    >
      <Flex justify="space-between" mb={4}>
        <Text color="white" fontWeight="bold">
          Output
        </Text>

        <Button colorScheme="blue" size="sm" onClick={runCode}>
          Run Code
        </Button>
      </Flex>

      <Box
        h="calc(100% - 50px)"
        bg="gray.900"
        borderRadius="md"
        p={4}
        whiteSpace="pre-wrap"
        fontFamily="mono"
        color={hasError ? "red.300" : "green.300"}
        border="1px solid"
        borderColor={hasError ? "red.500" : "green.500"}
      >
        {output}
      </Box>
    </Box>
  );
};

export default Output;
