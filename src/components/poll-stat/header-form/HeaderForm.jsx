import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { Form, Button, Col, Row } from "react-bootstrap";
import { zipWith } from "lodash";
import { updatePollMutation } from "../../../schema/mutations";

import "./HeaderForm.css";

const HeaderForm = ({ poll }) => {
  const [title, setTitle] = useState(poll.title);
  const [description, setDescription] = useState(poll.description);
  const [imagePath, setImagePath] = useState(poll.imagePath);

  const [updatePoll] = useMutation(updatePollMutation);

  const fields = [title, description, imagePath];
  const initValues = [poll.title, poll.description, poll.imagePath];

  const handleSubmit = event => {
    event.preventDefault();
    console.log(title, description, imagePath);
    updatePoll({
      variables: {
        title,
        description,
        imagePath,
        id: poll.id
      }
    }).then(data => console.log("update", data));
  };

  const validateForm = () => {
    return {
      title: title.length === 0,
      description: !description || description.length === 0,
      imagePath: !imagePath || imagePath.length === 0
    };
  };
  const errors = validateForm();

  const wasChanged = zipWith(fields, initValues, (field, init) => {
    return field !== init;
  }).some(el => el);

  const isUpdateDisabled =
    Object.keys(errors).some(x => errors[x]) || !wasChanged;

  const headerImage = {
    backgroundImage: `url(${imagePath})`,
    borderRadius: 5,
    height: 400,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    overflow: "hidden",
    marginTop: "-10px"
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div style={headerImage}></div>
      <div className="header-form-content">
        <div className="row-flex">
          <Form.Group>
            <Form.Control
              type="text"
              className="poll-stat-title"
              defaultValue={title}
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            disabled={isUpdateDisabled}
            className="update-poll-btn"
            size="lg"
            variant="light"
          >
            Update
          </Button>
        </div>
        <Form.Group>
          <Form.Control
            type="text"
            size="sm"
            defaultValue={imagePath}
            placeholder="Image url (optional)"
            onChange={e => setImagePath(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            as="textarea"
            size="lg"
            defaultValue={description}
            className="description"
            placeholder="Super challenging poll description"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default HeaderForm;
