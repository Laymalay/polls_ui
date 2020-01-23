import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Card, Button, CardColumns, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import { createUseStyles } from "react-jss";

import {  getCurrentUserQuery } from "schema/queries";
import { defaultPollPic, defaultPic } from "components/shared/constants";

import styles from "./PollList.styles";

const useStyles = createUseStyles(styles);

const PollList = props => {
  const classes = useStyles();

  const openPollView = pollId => props.history.push(`/pollView/${pollId}`);
  const polls = props.polls;

  const {
    data: {
      currentUser: { username }
    }
  } = useQuery(getCurrentUserQuery);
  
  return (
    <div>
      <CardColumns className={classes.cards}>
        {polls.map(poll => (
          <Card
            key={poll.title}
            bg="light"
            border="light"
            className={classes.pollCard}
          >
            <Card.Img
              variant="top"
              onError={e => (e.target.src = defaultPollPic)}
              src={poll.imagePath}
              className={classes.cardImg}
            />
            {poll.creator.avatar && (
              <Image
                onError={e => (e.target.src = defaultPic)}
                className={classes.pollListCreatorPic}
                roundedCircle
                src={poll.creator.avatar}
              />
            )}

            <Card.Body>
              <div className={classes.pollMain}>
                <div>
                  <Card.Title className={classes.cardTitle}>
                    {poll.title}
                  </Card.Title>
                  <Card.Subtitle>By {poll.creator.username}</Card.Subtitle>
                </div>
                <Button
                  onClick={() => openPollView(poll.id)}
                  className={classes.passBtn}
                  variant="info"
                  size="lg"
                >
                  {username === poll.creator.username ? "View" : "Pass"}
                </Button>
              </div>

              <Card.Text className={classes.cardText}>
                {poll.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default withRouter(PollList);
