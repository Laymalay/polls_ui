import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Image } from "react-bootstrap";
import randomColor from "randomcolor";

import { defaultPic } from "../../shared/constants";
import { getCurrentUserQuery } from "../../../schema/queries";

import "./UserView.css";

const UserView = ({ history, user }) => {
  const [avatar, setAvatar] = useState(user.avatar);
  const { data: { currentUser } = {} } = useQuery(getCurrentUserQuery);

  useEffect(() => {
    if (!user.avatar) {
      setAvatar(defaultPic);
    }
  }, [user.avatar]);

  const showUserPage = () => {
    if (currentUser && currentUser.id === user.id) {
      return history.push("/userprofile");
    }
    history.push(`user/${user.id}`);
  };

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
      onClick={showUserPage}
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
