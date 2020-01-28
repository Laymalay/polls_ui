import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Image } from "react-bootstrap";
import randomColor from "randomcolor";
import { createUseStyles } from "react-jss";

import { defaultPic } from "components/shared/constants";
import { getCurrentUserQuery } from "schema/queries";
import Loading from "components/shared/loading";
import ErrorContainer from "components/shared/error";

import styles from "./UserView.styles";

const useStyles = createUseStyles(styles);

const UserView = ({
  history: { push },
  user: { avatar: userAvatar, id, about, username, firstName, lastName }
}) => {
  const classes = useStyles();

  const [avatar, setAvatar] = useState(userAvatar);
  const { data: { currentUser } = {}, loading, error } = useQuery(
    getCurrentUserQuery
  );

  useEffect(() => {
    if (!userAvatar) {
      setAvatar(defaultPic);
    }
  }, [userAvatar]);

  const showUserPage = () => {
    if (currentUser && currentUser.id === id) {
      return push("/userprofile");
    }
    push(`user/${id}`);
  };

  const userColor = randomColor({
    luminosity: "light",
    hue: "blue",
    format: "rgba",
    alpha: 0.6
  });

  if (loading) return <Loading />;
  if (error) return <ErrorContainer />;

  return (
    <div
      style={{ backgroundColor: userColor }}
      className={classes.userViewBlock}
      onClick={showUserPage}
    >
      <Image
        alt="userpic"
        onError={() => setAvatar(defaultPic)}
        roundedCircle
        className={classes.userViewPic}
        src={avatar}
      />
      <div>
        <h2 className={classes.userViewUsername}>{username}</h2>
        <h5>
          {firstName} {lastName}
        </h5>
        <hr />
        <p>{about}</p>
      </div>
    </div>
  );
};

export default withRouter(UserView);
