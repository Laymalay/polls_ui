import React from "react";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";

import styles from "./BackButton.styles";

const useStyles = createUseStyles(styles);

const BackButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.backBtn}
      variant="outline-info"
      onClick={onClick}
    >
      <span className="oi oi-chevron-left"></span>
    </Button>
  );
};
export default BackButton;
