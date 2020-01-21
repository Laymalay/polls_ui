import React from "react";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";

import styles from "./AddButton.styles";

const useStyles = createUseStyles(styles);

const AddButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.addButton} variant="outline-info" onClick={onClick}>
      <span className="oi oi-plus"></span>
    </Button>
  );
};
export default AddButton;
