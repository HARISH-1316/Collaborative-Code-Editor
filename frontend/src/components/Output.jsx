import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Output = ({ output, hasError, runCode, isRunning }) => {
  return (
    <Box
      w="100%"
      h="75%"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
      p={4}
    >
      <Flex justify="space-between" mb={4}>
        <Text color="white" fontWeight="bold">
          Output
        </Text>

        <Button
          colorScheme="blue"
          size="sm"
          onClick={runCode}
          isLoading={isRunning}
          loadingText="Running"
        >
          Run Code
        </Button>
      </Flex>

      <Box
        h="calc(100% - 50px)"
        bg="gray.900"
        p={4}
        border="1px solid"
        borderColor={hasError ? "red.500" : "green.500"}
      >
        {isRunning ? (
          <Flex
            h="100%"
            justify="center"
            align="center"
            direction="column"
            gap={3}
          >
            <Spinner size="xl" thickness="4px" color="blue.400" />
            <Text color="gray.300">Running your code...</Text>
          </Flex>
        ) : (
          <Text
            whiteSpace="pre-wrap"
            fontFamily="mono"
            color={hasError ? "red.300" : "green.300"}
          >
            {output}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;
