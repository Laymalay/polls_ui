import { Spinner } from "react-bootstrap";
import React from "react";
import { createUseStyles } from "react-jss";

import styles from "./Loading.styles";

const useStyles = createUseStyles(styles);

const Loading = () => {
  const classes = useStyles();

  return (
    <Spinner className={classes.spinner} animation="grow" variant="info" />
  );
};

export default Loading;
