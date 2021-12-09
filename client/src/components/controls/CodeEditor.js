/* eslint-disable no-unused-vars */
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
const editorStyle = {
  border: "1px solid lightgray",
};

const CodeEditor = (props) => {
  const onChange = (newValue) => {
    props.onChange(newValue);
  };

  return (
    <AceEditor
      style={editorStyle}
      readOnly={false}
      onChange={onChange}
      width="100%"
      height="360px"
      mode="javascript"
      theme="solarized_dark"
      name="aceCodeEditor"
      fontSize={16}
      showPrintMargin
      showGutter
      highlightActiveLine
      value={props.code}
      editorProps={{
        $blockScrolling: true,
      }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
