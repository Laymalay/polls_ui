import React from "react";
import { Button } from "react-bootstrap";

import "./BackButton.css";

const BackButton = ({ onClick }) => {
  return (
    <Button className="back-btn" variant="outline-info" onClick={onClick}>
      <span className="oi oi-chevron-left"></span>
    </Button>
  );
};
export default BackButton;
