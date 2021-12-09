import React from "react";
import "../../assests/css/styles.css";
const AlertShow = (props) => {
  if (props.show) {
    return (
      <div className="alert">
        <h4>Oh snap! You got an error!</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>{props.message}</p>
      </div>
    );
  }
  return "";
};

export default AlertShow;
