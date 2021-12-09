import React from "react";

import { Form } from "react-bootstrap";

const OutputBox = (props) => {
  if (props.show) {
    return (
      <Form.Group>
        <Form.Control
          type="textarea"
          as="textarea"
          rows="8"
          readOnly
          value={props.message}
        />
      </Form.Group>
    );
  }

  return (
    <Form.Group style={{ marginBottom: "10px" }}>
      <Form.Control as="textarea" type="textarea" rows="8" readOnly value="" />
    </Form.Group>
  );
};

export default OutputBox;
