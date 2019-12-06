import React from "react";
import { Button } from "react-bootstrap";

import "./AddButton.css";

const AddButton = ({ onClick }) => {
  return (
    <Button className="add-button" variant="outline-info" onClick={onClick}>
      <span className="oi oi-plus"></span>
    </Button>
  );
};
export default AddButton;
