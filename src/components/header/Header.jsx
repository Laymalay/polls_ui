import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import { createUseStyles } from "react-jss";

import { getCurrentUserQuery } from "schema/queries";
import { AUTH_TOKEN } from "components/shared/constants";
import { Navbar, Nav } from "react-bootstrap";
import Loading from "components/shared/loading";
import ErrorContainer from "components/shared/error";

import styles from "./Header.styles";

const useStyles = createUseStyles(styles);

export const Header = () => {
  const classes = useStyles();

  const client = useApolloClient();

  const { data: { currentUser = {} } = {}, loading, error } = useQuery(
    getCurrentUserQuery
  );

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    client.writeData({ data: { isLoggedIn: false } });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorContainer />;

  const { id, username, isStaff } = currentUser;

  return (
    <Navbar sticky="top" variant="dark" className={classes.navbar}>
      <Navbar.Brand className={classes.navbarTitle}>
        <Link className={classes.navbarTitle} to="/polls">
          PollPool
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link className={classes.navLink} to="/polls">
          All Polls
        </Link>
        <Link className={classes.navLink} to={`/userpolls/${id}`}>
          My Polls
        </Link>
        <Link className={classes.navLink} to="/users">
          Users
        </Link>
        <Link className={classes.navLink} to="/test">
          NotFound
        </Link>
      </Nav>

      {username && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:
            <Link className={classes.userLink} to="/userprofile">
              {username}
            </Link>
          </Navbar.Text>
          {isStaff && (
            <a
              className={classes.settingsLink}
              href={`${process.env.REACT_APP_API_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="oi oi-wrench"></span>
            </a>
          )}
        </Navbar.Collapse>
      )}

      <Link onClick={logout} className={classes.navLink} to="/login">
        Logout
      </Link>
    </Navbar>
  );
};

export default withRouter(Header);
