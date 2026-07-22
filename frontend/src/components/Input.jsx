import { Box, Flex, Text, Textarea, Button, Tooltip } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

const Input = ({ input, setInput }) => {
  const clearInput = () => setInput("");

  return (
    <Box h="100%" display="flex" flexDirection="column" bg="gray.900">
      {/* Header */}
      <Flex
        h="48px"
        px={4}
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.700"
        bg="gray.800"
      >
        <Text
          color="gray.200"
          fontWeight="semi-bold"
          fontSize="lg"
          letterSpacing="0.5px"
        >
          Input
        </Text>

        <Tooltip label="Clear Input">
          <Button
            size="xs"
            variant="ghost"
            colorScheme="red"
            leftIcon={<FiTrash2 />}
            onClick={clearInput}
          >
            Clear
          </Button>
        </Tooltip>
      </Flex>

      {/* Textarea */}
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`//Input`}
        flex="1"
        resize="none"
        p={4}
        border="none"
        borderRadius="0"
        bg="gray.900"
        color="gray.100"
        fontFamily="mono"
        fontSize="14px"
        lineHeight="1.6"
        spellCheck={false}
        overflow="auto"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          border: "none",
        }}
        _focus={{
          border: "none",
          boxShadow: "none",
        }}
      />
    </Box>
  );
};

export default Input;
