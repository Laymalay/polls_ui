import React from "react";
import { createUseStyles } from "react-jss";

import styles from "./PageNotFound.styles";

const useStyles = createUseStyles(styles);

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageNotFound}>
      <h2>Page not found</h2>
    </div>
  );
};

export default PageNotFound;
