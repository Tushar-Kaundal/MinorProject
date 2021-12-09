import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assests/css/styles.css";

const LINKS = [
  { to: "/", text: "Home" },
  { to: "/editor", text: " Code Editor" },
];
const Header = () => {
  return (
    <header>
      <h2>Online Code Editor</h2>
      <div>
        {LINKS.map((item) => (
          <Button id="btn2" as={Link} to={item.to}>
            {item.text}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;
