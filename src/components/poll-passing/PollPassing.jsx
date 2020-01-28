import React, { useState, useMemo } from "react";
import { useMutation } from "react-apollo";
import { Form, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { createUseStyles } from "react-jss";

import PollHeader from "components/shared/poll-header";
import { createPassedPollMutation } from "schema/mutations";

import styles from "./PollPassing.styles";

const useStyles = createUseStyles(styles);

const PollPassing = ({ poll, passRequest }) => {
  const classes = useStyles();

  const [answers, setAnswers] = useState([]);

  const [passPoll] = useMutation(createPassedPollMutation);

  useMemo(() => {
    if (poll.questions) {
      setAnswers(
        poll.questions.map(({ id }) => ({
          questionId: id,
          choiceId: undefined
        }))
      );
    }
  }, [poll]);

  const { id, title, description, imagePath, questions, creator } = poll;

  const ifFormValid = answers.every(({ choiceId }) => choiceId !== undefined);

  const handleSubmit = e => {
    e.preventDefault();

    passPoll({
      variables: {
        pollId: id,
        answeredQuestions: answers
      }
    }).then(_ => {
      passRequest(false);
    });
  };

  const updateAnswers = (questionId, choiceId) => {
    setAnswers(
      answers.map(answer =>
        answer.questionId === questionId ? { ...answer, choiceId } : answer
      )
    );
  };

  return (
    <div className={classes.mainContent}>
      <PollHeader
        avatar={creator.avatar}
        imagePath={imagePath}
        title={title}
        username={creator.username}
        description={description}
      />
      <Form onSubmit={handleSubmit}>
        <hr />
        <div className={classes.pollQuestionTitle}>Questions:</div>
        {questions.map(({ id: questionId, title: questionTitle, choices }) => (
          <Form.Group key={questionId} className={classes.question} as={Row}>
            <Form.Label as="legend" column sm={8}>
              {questionTitle}
            </Form.Label>
            <Col sm={3}>
              {choices.map(({ id, title }) => (
                <Form.Check
                  custom
                  type="radio"
                  key={`${questionTitle}${id}`}
                  name={questionTitle}
                  id={id}
                  onChange={() => updateAnswers(questionId, id)}
                  label={title}
                />
              ))}
            </Col>
          </Form.Group>
        ))}
        <Button
          size="lg"
          variant="outline-info"
          className={classes.sendBtn}
          disabled={!ifFormValid}
          type="submit"
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(PollPassing);
