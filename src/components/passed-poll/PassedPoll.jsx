import React from "react";
import { Button, Row, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { useQuery } from "react-apollo";

import { getPassedPollQuery } from "../../schema/queries";
import Loading from "../shared/loading";
import PollHeader from "../shared/poll-header";

import "./PassedPoll.scss";

const PassedPoll = ({ passedPollId, history, passRequest }) => {
  console.log(passedPollId);
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
      <div className="main-content">
        <PollHeader
          imagePath={imagePath}
          title={title}
          username={creator.username}
          description={description}
        />
        <p className="passed-poll-score">
          Score: <b>{score * 100}%</b>{" "}
        </p>
        {answers.map(answer => {
          const style = answer.correct ? "correct" : "wrong";
          return (
            <div
              key={answer.question.title}
              className={`answer ${style}`}
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
          className="pass-again-btn"
          onClick={() => passRequest(true)}
        >
          Pass again
        </Button>
      </div>
    )
  );
};

export default withRouter(PassedPoll);
