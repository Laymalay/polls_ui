import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { zipWith } from "lodash";
import { useApolloClient } from "@apollo/react-hooks";
import { createUseStyles } from "react-jss";

import { getCurrentUserQuery } from "schema/queries";
import { updateUserMutation } from "schema/mutations";
import { defaultPic } from "components/shared/constants";
import Loading from "components/shared/loading";
import ErrorContainer from "components/shared/error";
import BackButton from "components/shared/back-button";

import styles from "./UserProfile.styles";

const useStyles = createUseStyles(styles);

const UserProfile = ({ history :{push} }) => {
  const classes = useStyles();

  const client = useApolloClient();

  const inputEl = useRef(null);

  const handleFileUpload = files => {
    const file = files[0];

    const reader = new FileReader();
    const imgtag = document.getElementById("avatar");

    reader.onload = event => {
      imgtag.src = event.target.result;
    };
    reader.readAsDataURL(file);

    setAvatar(file);
  };

  const { data: { currentUser } = {}, loading, error } = useQuery(
    getCurrentUserQuery
  );

  const [
    updateUser,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(updateUserMutation);

  const {
    id,
    email: currentEmail,
    firstName: currentFirstName,
    lastName: currentLastName,
    about: currentAbout,
    avatar: currentAvatar
  } = currentUser;

  const [email, setEmail] = useState(currentEmail);
  const [firstName, setFirstName] = useState(currentFirstName);
  const [lastName, setLastName] = useState(currentLastName);
  const [about, setAbout] = useState(currentAbout);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  const fields = [email, firstName, lastName, about, avatar];

  const initValues = [
    currentEmail,
    currentFirstName,
    currentLastName,
    currentAbout,
    currentAvatar
  ];
  const validateForm = () => {
    return {
      email: email.length === 0 || email.length > 150,
      firstName: firstName.length === 0 || firstName.length > 30,
      lastName: lastName.length === 0 || lastName.length > 150,
      about: about.length === 0 || about.length > 500
    };
  };

  const errors = validateForm();

  const wasChanged = zipWith(fields, initValues, (field, init) => {
    return field !== init;
  }).some(el => el);

  const isUpdateDisabled =
    Object.keys(errors).some(x => errors[x]) || !wasChanged;

  const handleSubmit = event => {
    event.preventDefault();
    updateUser({
      variables: {
        ...currentUser,
        email,
        avatar,
        firstName,
        lastName,
        about
      },
      update(cache, { data }) {
        cache.writeData({
          data: {
            currentUser: {
              ...currentUser,
              firstName,
              email,
              lastName,
              about
            }
          }
        });
      }
    }).then(
      ({
        data: {
          updateUser: { avatar }
        }
      }) => {
        setShowUpdateAlert(true);
        if (avatar) {
          setAvatar(avatar);
          client.writeData({
            data: {
              currentUser: {
                ...currentUser,
                avatar
              }
            }
          });
        }
      }
    );
  };

  useEffect(() => {
    if (!avatar) {
      setAvatar(defaultPic);
    }
  }, [avatar]);

  if (loading || mutationLoading) return <Loading />;
  if (error || mutationError) return <ErrorContainer />;

  return (
    <>
      <BackButton onClick={() => push("/polls")} />

      <Form onSubmit={handleSubmit}>
        <div className={classes.userContent}>
          <div className={classes.columnFlex}>
            <div className={classes.rowFlex}>
              <div className={classes.columnFlex}>
                <img
                  id="avatar"
                  onError={() => setAvatar(defaultPic)}
                  alt="userpic"
                  className={classes.userPic}
                  src={avatar}
                />

                <input
                  onChange={e => handleFileUpload(e.target.files)}
                  type="file"
                  ref={inputEl}
                  className={classes.inputAvatarHidden}
                />

                <Button
                  className={classes.changeUserPhotoBtn}
                  variant="outline-info"
                  onClick={() => inputEl.current.click()}
                >
                  Change
                </Button>
              </div>

              <div className={classes.mainUserInfo}>
                <div className={classes.username}>{currentUser.username}</div>
                <Form.Group as={Row} controlId="userForm.email">
                  <Form.Label column sm="3">
                    Email
                  </Form.Label>
                  <Col className={classes.fixedSize}>
                    <Form.Control
                      isInvalid={errors.email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="Enter your email"
                      defaultValue={email}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="userForm.firstName">
                  <Form.Label column sm="3">
                    FirstName
                  </Form.Label>
                  <Col className={classes.fixedSize}>
                    <Form.Control
                      type="text"
                      required
                      isInvalid={errors.firstName}
                      placeholder="Enter your first name"
                      onChange={e => setFirstName(e.target.value)}
                      defaultValue={firstName}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="userForm.lastName">
                  <Form.Label column sm="3">
                    LastName
                  </Form.Label>
                  <Col className={classes.fixedSize}>
                    <Form.Control
                      required
                      type="text"
                      isInvalid={errors.lastName}
                      placeholder="Enter your last name"
                      onChange={e => setLastName(e.target.value)}
                      defaultValue={lastName}
                    />
                  </Col>
                </Form.Group>

                <div className={classes.hr} />

                <Link className={classes.userPollsLink} to={`/userpolls/${id}`}>
                  My polls
                </Link>
              </div>
            </div>

            <Form.Group
              className={classes.userAbout}
              controlId="userForm.about"
            >
              <Form.Label>About</Form.Label>
              <Form.Control
                required
                onChange={e => setAbout(e.target.value)}
                className={classes.sizedTextarea}
                as="textarea"
                isInvalid={errors.about}
                rows="3"
                placeholder="Write a few words about yourself"
                defaultValue={about}
              />
            </Form.Group>
          </div>

          <Button
            disabled={isUpdateDisabled}
            className={classes.updateUserBtn}
            type="submit"
            size="lg"
            variant="outline-info"
          >
            Update me
          </Button>
        </div>
      </Form>

      {showUpdateAlert && (
        <Alert
          variant={"success"}
          onClose={() => setShowUpdateAlert(false)}
          dismissible
          className={classes.updateSuccessAlert}
        >
          User info successfully updated
        </Alert>
      )}
    </>
  );
};

export default withRouter(UserProfile);
