import React from "react";
import { createUseStyles } from "react-jss";

import styles from "./Error.styles";

const useStyles = createUseStyles(styles);

const Error = () => {
  const classes = useStyles();

  return (<span className={classes.error}>Error</span>  );
};

export default Error;
