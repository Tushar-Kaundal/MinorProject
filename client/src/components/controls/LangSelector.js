import React from "react";
import { Form } from "react-bootstrap";
import "../../assests/css/styles.css";

const LangSelector = (props) => {
  const onChange = (event) => {
    console.log(`You have selected ${event.target.value}`);
    props.onChange(event);
  };

  return (
    <Form.Select id="langs" onChange={onChange}>
      {props.langs.map((lang, index) => (
        <option key={lang} value={index}>
          {" "}
          {lang}{" "}
        </option>
      ))}
    </Form.Select>
  );
};

export default LangSelector;
