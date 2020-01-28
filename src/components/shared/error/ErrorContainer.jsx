import React from "react";
import { createUseStyles } from "react-jss";

import styles from "./ErrorContainer.styles";

const useStyles = createUseStyles(styles);

const ErrorContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.error}>
      <img
        alt="error"
        className={classes.errorImage}
        src="http://simpleicon.com/wp-content/uploads/sad.svg"
      />
      <span>Sorry, it seems like we have a problem</span>
    </div>
  );
};

export default ErrorContainer;
