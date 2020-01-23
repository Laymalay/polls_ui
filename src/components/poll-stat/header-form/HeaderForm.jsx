import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Form, Button } from "react-bootstrap";
import { zipWith } from "lodash";
import { createUseStyles } from "react-jss";

import { updatePollMutation } from "schema/mutations";

import styles from "./HeaderForm.styles";

const useStyles = createUseStyles(styles);

const HeaderForm = ({ poll }) => {
  const [title, setTitle] = useState(poll.title);
  const [description, setDescription] = useState(poll.description);
  const [imagePath, setImagePath] = useState(poll.imagePath);

  const classes = useStyles({ imagePath });

  const [updatePoll] = useMutation(updatePollMutation);

  const fields = [title, description, imagePath];
  const initValues = [poll.title, poll.description, poll.imagePath];

  const handleSubmit = event => {
    event.preventDefault();
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

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.headerFormContent}>
        <div className={classes.rowFlex}>
          <Form.Group>
            <Form.Control
              type="text"
              className={classes.pollStatTitle}
              defaultValue={title}
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            disabled={isUpdateDisabled}
            className={classes.updatePollBtn}
            size="lg"
            variant="light"
          >
            Update
          </Button>
        </div>
        <div>
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
              rows="4"
              defaultValue={description}
              placeholder="Super challenging poll description"
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default HeaderForm;
