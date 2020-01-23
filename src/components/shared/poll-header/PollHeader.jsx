import React from "react";
import { Image } from "react-bootstrap";
import { createUseStyles } from "react-jss";

import { defaultPic } from "components/shared/constants";

import styles from "./PollHeader.styles";

const useStyles = createUseStyles(styles);

const PollHeader = ({ imagePath, avatar, title, username, description }) => {
  const classes = useStyles({ imagePath });

  return (
    <>
      <div className={classes.pollHeader}>
        <div className={classes.pollShadow}>
          <div className={classes.pollTitle}>{title}</div>
          <div className={classes.pollCreator}>By {username}</div>
        </div>
        <div className={classes.dash} />
        {avatar && (
          <Image
            roundedCircle
            src={avatar}
            onError={e => (e.target.src = defaultPic)}
            className={classes.creatorPic}
          />
        )}
      </div>
      <div className={classes.pollDesc}>
        <i> {description}</i>
      </div>
    </>
  );
};
export default PollHeader;
