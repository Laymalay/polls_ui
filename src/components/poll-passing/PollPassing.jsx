import React, { useState, useMemo } from "react";
import { useMutation } from "react-apollo";
import { Form, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { createUseStyles } from "react-jss";

import { pollPassedByUserQuery } from "../../schema/queries";
import PollHeader from "../shared/poll-header";
import { createPassedPollMutation } from "../../schema/mutations";

import styles from "./PollPassing.styles";

const useStyles = createUseStyles(styles);

const PollPassing = ({ poll, passRequest }) => {
  const classes = useStyles();

  const [answers, setAnswers] = useState([]);

  const [passPoll] = useMutation(createPassedPollMutation, {
    update(cache, { data: { createPassedPoll } }) {
      const { pollPassedByUser } = cache.readQuery({
        query: pollPassedByUserQuery,
        variables: { poll: poll.id }
      });

      cache.writeQuery({
        query: pollPassedByUserQuery,
        data: {
          pollPassedByUser: {
            ...pollPassedByUser,
            __typename: "PassedPollType",
            id: createPassedPoll.id
          }
        },
        variables: { poll: poll.id }
      });
    }
  });

  useMemo(() => {
    if (poll.questions) {
      setAnswers(
        poll.questions.map(question => ({
          questionId: question.id,
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
    <>
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
          {questions.map(question => (
            <Form.Group key={question.id} className={classes.question} as={Row}>
              <Form.Label as="legend" column sm={8}>
                {question.title}
              </Form.Label>
              <Col sm={3}>
                {question.choices.map(choice => (
                  <Form.Check
                    custom
                    type="radio"
                    key={`${question.title}${choice.id}`}
                    name={question.title}
                    id={choice.id}
                    onChange={_ => updateAnswers(question.id, choice.id)}
                    label={choice.title}
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
    </>
  );
};

export default withRouter(PollPassing);
