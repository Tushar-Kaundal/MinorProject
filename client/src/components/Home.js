import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assests/css/styles.css";
import PageLayout from "./PageLayout";
const Home = () => {
  return (
    <PageLayout>
      <div className="main">
        <div className="content">
          <h1>Online Code Editor</h1>
          <p>Built with React, Node.js & Express </p>
          <Button id="btn1" as={Link} to="/editor">
            Start Coding
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
