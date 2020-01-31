import React from "react";
import { Button, Row, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { useQuery } from "react-apollo";
import { createUseStyles } from "react-jss";

import { getPassedPollQuery } from "schema/queries";
import Loading from "components/shared/loading";
import PollHeader from "components/shared/poll-header";
import ErrorContainer from "components/shared/error";

import styles from "./PassedPoll.styles";

const useStyles = createUseStyles(styles);

const PassedPoll = ({ passedPollId, passRequest }) => {
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
  if (error) return <ErrorContainer />;

  const { answers, score, poll } = passedPoll;
  const { title, description, imagePath, creator } = poll;

  return (
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
      {answers.map(({ question, correct, choice }) => (
        <div
          key={question.title}
          className={correct ? classes.correct : classes.wrong}
          as={Row}
        >
          <Form.Label as="legend" column sm={5}>
            {question.title}
          </Form.Label>
          <Col sm={3}>
            {question.choices.map(({ id, title }) => (
              <Form.Check
                readOnly
                custom
                disabled={choice.id !== id}
                type="radio"
                key={`${question.title}${id}`}
                name={question.title}
                id={id}
                label={title}
                checked={choice.id === id}
              />
            ))}
          </Col>
        </div>
      ))}

      <Button
        size="lg"
        variant="outline-info"
        className={classes.passAgainBtn}
        onClick={() => passRequest(true)}
      >
        Pass again
      </Button>
    </div>
  );
};

export default withRouter(PassedPoll);
