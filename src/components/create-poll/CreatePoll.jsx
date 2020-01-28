import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Form, Button, Col } from "react-bootstrap";
import { createUseStyles } from "react-jss";

import { createPollMutation } from "schema/mutations";
import { getAllPollsQuery, getCurrentUserQuery } from "schema/queries";
import Question from "components/question";
import BackButton from "components/shared/back-button";
import { defaultPollPic } from "components/shared/constants";

import styles from "./CreatePoll.styles";

const useStyles = createUseStyles(styles);

export const CreatePoll = ({ history: { push } }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{}]);
  const [imagePath, setImagePath] = useState(defaultPollPic);

  const classes = useStyles({ imagePath });

  const validateForm = () => {
    return {
      title: title.length === 0 || title.length > 200,
      description: description.length === 0 || description.length > 400
    };
  };

  const errors = validateForm();

  const {
    data: {
      currentUser: { username }
    }
  } = useQuery(getCurrentUserQuery);

  const [createPoll] = useMutation(createPollMutation, {
    update(cache, { data: { createPoll } }) {
      const { allPolls } = cache.readQuery({ query: getAllPollsQuery });
      cache.writeQuery({
        query: getAllPollsQuery,
        data: { allPolls: [...allPolls, createPoll] }
      });
    }
  });

  const isCreateDisabled =
    Object.keys(errors).some(x => errors[x]) || questions.length <= 1;

  const handleSubmit = event => {
    event.preventDefault();

    const parsed_questions = questions.reduce(
      (arr, { questionTitle, questionAnswer, questionChoices }) => {
        if (questionTitle) {
          arr = [
            ...arr,
            {
              title: questionTitle,
              answer: questionAnswer,
              choices: questionChoices
            }
          ];
        }
        return arr;
      },
      []
    );

    createPoll({
      variables: {
        title,
        description,
        imagePath,
        questions: parsed_questions
      }
    }).then(() => push("/polls"));
  };

  return (
    <Form className={classes.createForm}>
      <BackButton onClick={() => push("/polls")} />
      <div className={classes.headerStyle}>
        <Form.Row className={classes.firstLine}>
          <Form.Group as={Col} md="3">
            <Form.Control
              type="text"
              isInvalid={errors.title}
              isValid={!errors.title}
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="5">
            <Form.Control
              type="text"
              value={imagePath}
              placeholder="Image url (optional)"
              onChange={e => setImagePath(e.target.value)}
            />
          </Form.Group>

          <Form.Label column md="1" className={classes.creator}>
            Creator:
          </Form.Label>
          <Form.Group as={Col} md="2">
            <Form.Control type="text" disabled value={username} />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Control
            as="textarea"
            size="lg"
            rows="4"
            isInvalid={errors.description}
            isValid={!errors.description}
            className={classes.description}
            placeholder="Super challenging poll description"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
      </div>
      <Form.Group>
        <Form.Label className={classes.pollQuestionsTitle}>
          Questions:
        </Form.Label>
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            updateQuestions={question => setQuestions([question, ...questions])}
          />
        ))}
      </Form.Group>

      <Button
        size="lg"
        variant="outline-info"
        block
        className={classes.createPollBtn}
        disabled={isCreateDisabled}
        type="button"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Form>
  );
};

export default withRouter(CreatePoll);
