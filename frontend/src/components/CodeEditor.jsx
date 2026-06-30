import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
import Split from "react-split";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef(null);

  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
  };

  return (
    <Box pt={7} px={10} h="75vh">
      <Split
        sizes={[70, 30]}
        minSize={250}
        gutterSize={8}
        direction="horizontal"
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Box bg="gray.900" h="75%" overflow="hidden">
          <LanguageSelector language={language} onSelect={setLanguage} />

          <Editor
            height="calc(100% - 75px)"
            theme="vs-dark"
            language={language}
            value={code}
            onMount={onMount}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </Box>

        <Output editorRef={editorRef} language={language} />
      </Split>
    </Box>
  );
};

export default CodeEditor;
