import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

const LanguageSelector = ({ language, onSelect }) => {
  const selectedLanguage =
    languages.find((lang) => lang.value === language) || languages[0];

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
        Language
      </Text>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="blue"
          minW="180px"
        >
          {selectedLanguage.label}
        </MenuButton>

        <MenuList bg="gray.800" borderColor="gray.700">
          {languages.map((lang) => {
            const isSelected = language === lang.value;

            return (
              <MenuItem
                key={lang.value}
                onClick={() => onSelect(lang.value)}
                bg={isSelected ? "blue.500" : "gray.800"}
                color="white"
                fontWeight={isSelected ? "bold" : "normal"}
                _hover={{
                  color: "blue.300",
                }}
              >
                {lang.label}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
