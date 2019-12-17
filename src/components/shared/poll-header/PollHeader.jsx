import React from "react";
import { Image } from "react-bootstrap";

import "./PollHeader.css";

const PollHeader = ({ imagePath, avatar, title, username, description }) => {
  const headerImage = {
    backgroundImage: `url(${imagePath})`,
    backgroundColor: "rgba(23, 163, 184, 0.2)",
    borderRadius: 5,
    height: 400,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  };

  return (
    <>
      <div className="poll-header" style={headerImage}>
        <div className="poll-shadow">
          <div className="poll-title">{title}</div>
          <div className="poll-creator">By {username}</div>
        </div>
        <div className="dash"/>
        <Image roundedCircle src={avatar} className="creator-pic" />
      </div>
      <div className="poll-desc">
        <i> {description}</i>
      </div>
    </>
  );
};
export default PollHeader;
