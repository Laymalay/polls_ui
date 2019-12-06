import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

import "./Question.scss";

export const Question = ({ question, updateQuestions }) => {
  const { title = "", choices = ["", "", ""], answer = "" } = question;

  const [questionTitle, setQuestionTitle] = useState(title);
  const [questionChoices, setQuestionChoices] = useState(choices);
  const [questionAnswer, setQuestionAnswer] = useState(answer);

  const formType = Object.keys(question).length === 0 ? "create" : "view";

  const enableAnswer = questionChoices.every(item => item !== "");

  const validForm = questionTitle.length > 0 && enableAnswer;

  const setChoices = (value, index) => {
    const updatedChoices = questionChoices.map((item, i) =>
      index === i ? value : item
    );

    setQuestionChoices(updatedChoices);
  };

  // set default correct answer
  useEffect(() => {
    if (enableAnswer && answer === "") {
      setQuestionAnswer(questionChoices[0]);
    }
  }, [enableAnswer]);

  return (
    <div className={`question-form-${formType}`}>
      <Row>
        <Col>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            className="question-title"
            as="textarea"
            size="sm"
            disabled={formType === "view"}
            defaultValue={questionTitle}
            placeholder="What is the capital of Belarus?"
            onChange={e => setQuestionTitle(e.target.value)}
          />

          <Form.Label>Choices:</Form.Label>
          {choices.map((choice, index) => (
            <Form.Control
              key={`${choice} ${index}`}
              size="sm"
              className="choice"
              type="text"
              disabled={formType === "view"}
              placeholder={`choice ${index}`}
              onChange={e => setChoices(e.target.value, index)}
            />
          ))}
        </Col>

        <Col>
          <Form.Label>Question type:</Form.Label>
          <Form.Control
            as="select"
            disabled={formType === "view"}
            size="sm"
            className="choice"
          >
            <option>closed</option>
            <option disabled>open</option>
            <option disabled>multiple choices</option>
          </Form.Control>

          {enableAnswer && (
            <div>
              <Form.Label>Correct answer:</Form.Label>
              <Form.Control
                as="select"
                disabled={formType === "view"}
                onChange={e => setQuestionAnswer(e.target.value)}
              >
                {questionChoices.map((choice, index) => (
                  <option key={`${choice} ${index}`}>{choice}</option>
                ))}
              </Form.Control>
            </div>
          )}

          {formType === "create" && (
            <Button
              className="add-btn"
              variant="outline-info"
              block
              disabled={!validForm}
              onClick={() => {
                updateQuestions({
                  questionTitle,
                  questionChoices,
                  questionAnswer
                });
              }}
            >
              +
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Question;
