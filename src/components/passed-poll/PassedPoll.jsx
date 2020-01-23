import React from "react";
import { Button, Row, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { useQuery } from "react-apollo";
import { createUseStyles } from "react-jss";

import { getPassedPollQuery } from "schema/queries";
import Loading from "components/shared/loading";
import PollHeader from "components/shared/poll-header";

import styles from "./PassedPoll.styles";

const useStyles = createUseStyles(styles);

const PassedPoll = ({ passedPollId, history, passRequest }) => {
  const classes = useStyles();

  const { data: { passedPoll = {} } = {}, loading, error } = useQuery(
    getPassedPollQuery,
    {
      variables: {
        id: passedPollId
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { answers, score } = passedPoll;
  const { title, description, imagePath, creator } = passedPoll.poll;

  return (
    passedPoll && (
      <div className={classes.mainContent}>
        <PollHeader
          avatar={creator.avatar}
          imagePath={imagePath}
          title={title}
          username={creator.username}
          description={description}
        />
        <p className={classes.passedPollScore}>
          Score: <b>{score * 100}%</b>{" "}
        </p>
        {answers.map(answer => {
          return (
            <div
              key={answer.question.title}
              className={answer.correct ? classes.correct : classes.wrong}
              as={Row}
            >
              <Form.Label as="legend" column sm={5}>
                {answer.question.title}
              </Form.Label>
              <Col sm={3}>
                {answer.question.choices.map(choice => (
                  <Form.Check
                    readOnly
                    custom
                    disabled={answer.choice.id !== choice.id}
                    type="radio"
                    key={`${answer.question.title}${choice.id}`}
                    name={answer.question.title}
                    id={choice.id}
                    label={choice.title}
                    checked={answer.choice.id === choice.id}
                  />
                ))}
              </Col>
            </div>
          );
        })}

        <Button
          size="lg"
          variant="outline-info"
          className={classes.passAgainBtn}
          onClick={() => passRequest(true)}
        >
          Pass again
        </Button>
      </div>
    )
  );
};

export default withRouter(PassedPoll);
