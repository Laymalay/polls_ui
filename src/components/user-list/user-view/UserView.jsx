import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Image } from "react-bootstrap";
import randomColor from "randomcolor";

import "./UserView.css";

const UserView = ({ history, user }) => {
  const [avatar, setAvatar] = useState(user.avatar);
  const defaultPic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6rgutjxxjJkzrNNuUjDHc1_0XWRBvvMRCAEWsT0MzVt3xjYf&s";

  useEffect(() => {
    if (!user.avatar) {
      setAvatar(defaultPic);
    }
  }, [user.avatar]);

  const userColor = randomColor({
    luminosity: "light",
    hue: "blue",
    format: "rgba",
    alpha: 0.6
  });

  return (
    <div
      style={{ backgroundColor: userColor }}
      className="user-view-block row-flex"
      onClick={() => history.push(`user/${user.id}`)}
    >
      <Image
        alt="userpic"
        onError={() => setAvatar(defaultPic)}
        roundedCircle
        className="user-view-pic"
        src={avatar}
      />
      <div>
        <h2 className="user-view-username">{user.username}</h2>
        <h5>
          {user.firstName} {user.lastName}
        </h5>
        <hr />
        <p>{user.about}</p>
      </div>
    </div>
  );
};

export default withRouter(UserView);
