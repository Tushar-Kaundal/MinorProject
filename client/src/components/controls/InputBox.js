import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
const editorStyle = {
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginBottom: "10px",
};

const InputBox = (props) => {
  const onChange = (newValue) => {
    props.onChange(newValue);
  };
  return (
    <AceEditor
      style={editorStyle}
      readOnly={false}
      onChange={onChange}
      width="100%"
      height="206px"
      mode="javascript"
      theme="textmate"
      name="textEditor"
      fontSize={16}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={false}
      value={props.input}
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

export default InputBox;
