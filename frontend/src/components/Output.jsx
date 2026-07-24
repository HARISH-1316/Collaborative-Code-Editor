import { Box, Button, Flex, Text } from "@chakra-ui/react";

const Output = ({ output, hasError, runCode }) => {
  return (
    <Box
      w="100%"
      h="75%"
      bg="gray.800"
      borderRadius="0"
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
        borderRadius="0"
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
