import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";

const languages = {
  javascript: [".js", "JavaScript"],
  typescript: [".ts", "TypeScript"],
  python: [".py", "Python"],
  java: [".java", "Java"],
  cpp: [".cpp", "C++"],
};

const FileInfo = ({ fileName, language, handleSave }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="lg"
      p={4}
      mb={4}
    >
      <Text color="gray.200" fontWeight="bold">
        {fileName}
        {language && languages[language][0]}
      </Text>

      <HStack spacing={3}>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            console.log("Button clicked");
            handleSave();
          }}
        >
          Save
        </Button>

        <Text
          color="blue.300"
          fontWeight="semibold"
          bg="gray.700"
          px={3}
          py={1}
          borderRadius="md"
        >
          {language && languages[language][1]}
        </Text>
      </HStack>
    </Box>
  );
};

export default FileInfo;
