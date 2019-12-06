import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Form, Button, Col } from "react-bootstrap";

import {
  createPollMutation,
  createChoiceMutation,
  createQuestionMutation
} from "../../schema/mutations";
import { getAllPollsQuery, getCurrentUserQuery } from "../../schema/queries";
import Question from "../question";
import "./CreatePoll.css";
import BackButton from "../shared/back-button";

export const CreatePoll = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{}]);

  const [imagePath, setImagePath] = useState(
    "https://i.pinimg.com/originals/21/61/8e/21618e399ac27c80aac237c8e2e5021d.jpg"
  );

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
        data: { allPolls: allPolls.concat([createPoll]) }
      });
    }
  });

  const [createQuestion] = useMutation(createQuestionMutation);
  const [createChoice] = useMutation(createChoiceMutation);

  const headerStyle = {
    backgroundImage: `url(${imagePath})`,
    padding: 10,
    backgroundSize: "100% 100%",
    backgroundRepeat: "repeat",
    backgroundPosition: "center center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 400,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const isFormValid = title.length > 0 && description.length > 0;

  const handleSubmit = event => {
    event.preventDefault();
    createPoll({
      variables: {
        title,
        description,
        imagePath
      }
    }).then(
      ({
        data: {
          createPoll: { id }
        }
      }) => {
        questions
          .filter(question => question.questionTitle)
          .forEach(({ questionTitle, questionAnswer, questionChoices }) => {
            createQuestion({
              variables: {
                answer: questionAnswer,
                pollId: id,
                title: questionTitle
              }
            }).then(
              ({
                data: {
                  createQuestion: { id }
                }
              }) => {
                questionChoices.forEach(item => {
                  createChoice({
                    variables: {
                      title: item,
                      questionId: id
                    }
                  });
                });
              }
            );
          });
        props.history.push("/polls");
      }
    );
  };

  return (
    <Form className="create-form" onSubmit={handleSubmit}>
      <BackButton onClick={() => props.history.push("/polls")} />
      <div style={headerStyle}>
        <Form.Row className="first-line">
          <Form.Group as={Col} md="3">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="5">
            <Form.Control
              type="text"
              placeholder="Image url (optional)"
              onChange={e => setImagePath(e.target.value)}
            />
          </Form.Group>

          <Form.Label column md="1" className="creator">
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
            className="description"
            placeholder="Super challenging poll description"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
      </div>
      <Form.Group>
        <Form.Label className="poll-questions-title">Questions:</Form.Label>
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
        className="create-poll-btn bottom-button"
        disabled={!isFormValid}
        type="submit"
      >
        Create
      </Button>
    </Form>
  );
};

export default withRouter(CreatePoll);
