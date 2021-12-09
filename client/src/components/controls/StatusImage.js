import React from "react";

import { Image } from "react-bootstrap";
import ok from "../../assests/images/ok.png";
import error from "../../assests/images/error.png";

const StatusImage = (props) => {
  if (props.hasError) {
    return <Image src={error} rounded />;
  } else if (props.message !== "") {
    return <Image src={ok} rounded />;
  }
  return "";
};

export default StatusImage;
