import React, { useState, useEffect } from "react";

// Import Brace and the AceEditor Component
import AceEditor from "react-ace";

import { Card } from "@material-ui/core";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const defaultCode = `
#include <bits/stdc++.h>

using namespace std;

int main(){
    
    return 0;
}
`;

const getPrevCode = (id) => {
  const prevCode = localStorage.getItem(id);
  if (prevCode)
    return prevCode;
  else 
    return defaultCode;
};

const CodeEditor = ({ problem, handler }) => {
  const [code, setCode] = useState("");

  const handleChange = (newCode) => {
    handler(newCode);
    setCode(newCode);
    localStorage.setItem(`${problem._id}`,newCode);
  };
  
  useEffect(()=>{
    handleChange(getPrevCode(`${problem._id}`));
  }, []);
  useEffect(()=>{handler(code)});

  return (
    <Card elevation={10}>
    <div id="editor">
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        value={code}
        onChange={handleChange}
        editorProps={{
          $blockScrolling: true,
        }}
        placeholder="// Write your code here"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 4,
        }}
        showPrintMargin={false}
        fontSize={18}
      />
    </div>
    </Card>
  );
};

export default CodeEditor;
