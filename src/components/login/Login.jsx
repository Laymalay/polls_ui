import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Alert
} from "react-bootstrap";
import { withRouter } from "react-router";
import { useMutation } from "react-apollo-hooks";
import { useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import { createUseStyles } from "react-jss";

import { AUTH_TOKEN } from "components/shared/constants";
import { loginMutation, signupMutation } from "schema/mutations";
import { getCurrentUserQuery } from "schema/queries";
import Loading from "components/shared/loading";

import styles from "./Login.styles";

const useStyles = createUseStyles(styles);

const Login = ({ history: { push } }) => {
  const classes = useStyles();

  const client = useApolloClient();

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(loginMutation);
  const [signUp] = useMutation(signupMutation);

  const [getMe, { loadingUser, data }] = useLazyQuery(getCurrentUserQuery, {
    fetchPolicy: "network-only"
  });

  if (loadingUser) return <Loading />;

  if (data && data.currentUser) {
    client.writeData({ data: { isLoggedIn: true } });
    push("/polls");
  }

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!isLogin) {
      signUp({
        variables: {
          email,
          password,
          username
        }
      })
        .then(() => setIsLogin(true))
        .catch(e => {
          setShowAlert(true);
          setAlertText(e.graphQLErrors[0].message);
        });
      return;
    }
    login({
      variables: {
        username,
        password
      }
    })
      .then(
        ({
          data: {
            tokenAuth: { token }
          }
        }) => {
          localStorage.setItem(AUTH_TOKEN, token);
          getMe();
        }
      )
      .catch(e => {
        setShowAlert(true);
        setAlertText(e.graphQLErrors[0].message);
      });
  };

  return (
    <>
      <Form className={classes.loginForm} onSubmit={handleSubmit}>
        {!isLogin && (
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              className={classes.loginFormControl}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
        )}
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            className={classes.loginFormControl}
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            className={classes.loginFormControl}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button
          variant="info"
          block
          className={classes.actionBtn}
          size="lg"
          disabled={!validateForm()}
          type="submit"
        >
          {isLogin ? "Login" : "Create account"}
        </Button>
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "need to create an account?" : "already have an account?"}
        </Button>
      </Form>
      {showAlert && (
        <Alert
          className={classes.alertLoginError}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{alertText}</p>
        </Alert>
      )}
    </>
  );
};
export default withRouter(Login);
