import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Card, Button, CardColumns, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import { createUseStyles } from "react-jss";

import { getCurrentUserQuery } from "schema/queries";
import { defaultPollPic, defaultPic } from "components/shared/constants";
import Loading from "components/shared/loading";
import ErrorContainer from "components/shared/error";

import styles from "./PollList.styles";

const useStyles = createUseStyles(styles);

const PollList = ({ history: { push }, polls }) => {
  const classes = useStyles();

  const openPollView = pollId => push(`/pollView/${pollId}`);

  const {
    data: {
      currentUser: { username }
    },
    loading,
    error
  } = useQuery(getCurrentUserQuery);

  if (loading) return <Loading />;
  if (error) return <ErrorContainer />;

  return (
    <div>
      <CardColumns className={classes.cards}>
        {polls.map(({ title, imagePath, creator, id, description }) => (
          <Card
            key={title}
            bg="light"
            border="light"
            className={classes.pollCard}
          >
            <Card.Img
              variant="top"
              onError={e => (e.target.src = defaultPollPic)}
              src={imagePath}
              className={classes.cardImg}
            />
            {creator.avatar && (
              <Image
                onError={e => (e.target.src = defaultPic)}
                className={classes.pollListCreatorPic}
                roundedCircle
                src={creator.avatar}
              />
            )}

            <Card.Body>
              <div className={classes.pollMain}>
                <div>
                  <Card.Title className={classes.cardTitle}>{title}</Card.Title>
                  <Card.Subtitle>By {creator.username}</Card.Subtitle>
                </div>
                <Button
                  onClick={() => openPollView(id)}
                  className={classes.passBtn}
                  variant="info"
                  size="lg"
                >
                  {username === creator.username ? "View" : "Pass"}
                </Button>
              </div>

              <Card.Text className={classes.cardText}>{description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default withRouter(PollList);
