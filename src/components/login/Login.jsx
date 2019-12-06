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

import { AUTH_TOKEN } from "../../constants";
import { loginMutation, signupMutation } from "../../schema/mutations";
import { meQuery } from "../../schema/queries";
import Loading from "../shared/loading";

import "./Login.css";
const Login = ({ history }) => {
  const client = useApolloClient();

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(loginMutation);
  const [signUp] = useMutation(signupMutation);
  
  const [getMe, { loadingUser, data }] = useLazyQuery(meQuery, {
    fetchPolicy: "network-only"
  });

  if (loadingUser) return <Loading />;

  if (data && data.me) {
    client.writeData({ data: { isLoggedIn: true, currentUser: data.me } });
    history.push("/polls");
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
      <Form className="login-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              className="login-form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
        )}
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            className="login-form-control"
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            className="login-form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button
          variant="info"
          block
          className="action-btn"
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
          className="alert-login-error"
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
