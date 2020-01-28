import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter, Link } from "react-router-dom";
import { Row, Image } from "react-bootstrap";
import { createUseStyles } from "react-jss";

import { getUserQuery } from "schema/queries";
import Loading from "components/shared/loading";
import BackButton from "components/shared/back-button";
import { defaultPic } from "components/shared/constants";
import ErrorContainer from "components/shared/error";

import styles from "./UserPage.styles";

const useStyles = createUseStyles(styles);

const UserPage = ({
  history: { push },
  match: {
    params: { id: userId }
  }
}) => {
  const classes = useStyles();

  const [avatar, setAvatar] = useState("");
  const { data: { user } = {}, loading, error } = useQuery(getUserQuery, {
    variables: {
      id: userId
    }
  });

  useEffect(
    () =>
      user && user.avatar ? setAvatar(user.avatar) : setAvatar(defaultPic),
    [user]
  );

  if (loading) return <Loading />;
  if (error) return <ErrorContainer />;

  const { id, username, firstName, lastName, email, about } = user;

  return (
    <>
      <BackButton onClick={() => push("/users")} />
      {user && (
        <div className={classes.userPageContent}>
          <div className={classes.columnFlex}>
            <Row>
              <Image
                onError={() => setAvatar(defaultPic)}
                alt="userpic"
                roundedCircle
                className={classes.userPagePic}
                src={avatar}
              />

              <div className={classes.userPageInfo}>
                <div className={classes.username}>{username}</div>
                <div>{email}</div>
                <div>
                  {firstName} {lastName}
                </div>

                <div className={classes.hr} />

                <Link className={classes.userPollsLink} to={`/userpolls/${id}`}>
                  User polls
                </Link>
              </div>
            </Row>

            <div className={classes.userAbout}>
              <p className={classes.userPageBio}>Bio:</p>
              <div className={classes.userPageDesc}>{about}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(UserPage);
