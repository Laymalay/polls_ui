import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter, Link } from "react-router-dom";
import { Row, Image } from "react-bootstrap";

import { getUserQuery } from "../../schema/queries";
import Loading from "../shared/loading";
import BackButton from "../shared/back-button";

import "./UserPage.css";

const UserPage = ({ history, match }) => {
  const [avatar, setAvatar] = useState("");
  const { data: { user } = {}, loading, error } = useQuery(getUserQuery, {
    variables: {
      id: match.params.id
    }
  });

  useEffect(
    () =>
      user && user.avatar ? setAvatar(user.avatar) : setAvatar(defaultPic),
    [user]
  );
  const defaultPic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6rgutjxxjJkzrNNuUjDHc1_0XWRBvvMRCAEWsT0MzVt3xjYf&s";

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { id, username, firstName, lastName, email, about } = user;

  return (
    <>
      <BackButton onClick={() => history.push("/users")} />
      {user && (
        <div className="user-page-content">
          <div className="column-flex">
            <Row>
              <Image
                onError={() => setAvatar(defaultPic)}
                alt="userpic"
                roundedCircle
                className="user-page-pic"
                src={avatar}
              />

              <div className="user-page-info">
                <div className="username">{username}</div>
                <div>{email}</div>
                <div>
                  {firstName} {lastName}
                </div>

                <div className="hr" />

                <Link className="user-polls-link" to={`/userpolls/${id}`}>
                  User polls
                </Link>
              </div>
            </Row>

            <div className="user-about">
              <p className="user-page-bio">Bio:</p>
              <div className="user-page-desc">{about}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(UserPage);
