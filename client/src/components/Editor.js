import React, { useEffect, useState } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import LangSelector from "./controls/LangSelector";
import CodeEditor from "./controls/CodeEditor";
import AlertShow from "./controls/AlertShow";
import OutputBox from "./controls/OutputBox";
import StatusImage from "./controls/StatusImage";
import { getTask, run } from "../api/CompilerApi";
import "../assests/css/styles.css";
import PageLayout from "./PageLayout";
import InputBox from "./controls/InputBox";

let languages = ["C++", "Python", "Java"];

const Editor = () => {
  const [language, setLanguage] = useState(0);
  const [task, setTask] = useState({ lang: "c++", code: "", input: "" });
  const [response, setResponse] = useState({
    status: "0",
    message: "",
  });
  const [show, setShow] = useState({ input: 0, output: 1 });
  useEffect(() => {
    getTask(task.lang)
      // .then(res => res.json())
      .then((task) => {
        console.log(task);
        setTask(task);
      });
  }, [task.lang]);
  const handleCodeChange = (code) => {
    task.code = code;
    console.log(code);
    setTask(task);
  };
  const handleInputChange = (input) => {
    task.input = input;
    console.log(input);
    setTask(task);
  };
  const handleRun = (event) => {
    event.preventDefault();
    console.log(task);
    run(task)
      .then((res) => {
        setResponse(res);
        if (res.status !== "0") {
          setShow({ input: 0, output: 0 });
        } else {
          setShow({ input: 0, output: 1 });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  };

  const handleShow = (ev) => {
    if (ev.target.innerText === "Input") {
      setShow({ input: 1, output: 0 });
    }
    if (ev.target.innerText === "Output") {
      setShow({ input: 0, output: 1 });
    }
  };

  const handleLangChange = (event) => {
    const index = parseInt(event.target.value, 10);
    getTask(languages[index]).then((task) => {
      console.log(task);
      setTask(task);
    });
    const response = { status: "0", message: "" };
    setResponse(response);
    setLanguage({ selectedLang: index });
  };

  return (
    <PageLayout>
      <Container>
        <Row>
          <Col sm={12}>
            <LangSelector
              langs={languages}
              selectedIndex={language}
              onChange={handleLangChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <CodeEditor onChange={handleCodeChange} code={task.code} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button id="btn" type="button" onClick={handleShow}>
              Input
            </Button>
            <Button id="btn" type="button" onClick={handleShow}>
              Output
            </Button>
            <Button id="btn" type="button" onClick={handleRun}>
              Run
            </Button>
            <StatusImage
              hasError={response.status !== "0"}
              message={response.message}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            {show.input ? (
              <InputBox onChange={handleInputChange} input={task.input} />
            ) : (
              ""
            )}
            {show.output ? (
              <OutputBox
                show={response.status === "0"}
                message={response.message}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <AlertShow
              show={response.status !== "0"}
              message={response.message}
            />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
};

export default Editor;
