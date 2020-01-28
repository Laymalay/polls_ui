import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Form, Button, Alert } from "react-bootstrap";
import { zipWith } from "lodash";
import { createUseStyles } from "react-jss";

import { updatePollMutation } from "schema/mutations";

import styles from "./HeaderForm.styles";

const useStyles = createUseStyles(styles);

const HeaderForm = ({
  poll: {
    title: currentTitle,
    description: currentDescription,
    imagePath: currentImagePath,
    id
  }
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [imagePath, setImagePath] = useState(currentImagePath);

  const classes = useStyles({ imagePath });

  const [updatePoll] = useMutation(updatePollMutation);

  const fields = [title, description, imagePath];
  const initValues = [currentTitle, currentDescription, currentImagePath];
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    updatePoll({
      variables: {
        title,
        description,
        imagePath,
        id
      }
    }).then(data => setShowUpdateAlert(true));
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
    <>
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
      {showUpdateAlert && (
        <Alert
          variant={"success"}
          onClose={() => setShowUpdateAlert(false)}
          dismissible
          className={classes.updateSuccessAlert}
        >
          Poll successfully updated
        </Alert>
      )}
    </>
  );
};

export default HeaderForm;
