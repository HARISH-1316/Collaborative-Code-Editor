import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { editor } from "monaco-editor";
import { executeCode } from "./api";

const Output = ({ editorRef, language }) => {
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }

    try {
      const output = await executeCode(language, sourceCode);
      console.log(output);
    } catch (error) {
      console.log("err");
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
        color="white"
      >
        Hello Output
      </Box>
    </Box>
  );
};

export default Output;
